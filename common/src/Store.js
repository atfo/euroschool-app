// eslint-disable no-underscore-dangle
// @flow
import { AsyncStorage } from 'react-native';
import { combineReducers, createStore as reduxCreateStore, applyMiddleware, compose } from 'redux';
const { createNavigationEnabledStore, NavigationReducer } = require('@expo/ex-navigation');
import createSagaMiddleware from 'redux-saga';

import RootSaga from './RootSaga';
import middleware from '../lib/utils/middleware';

import startup   from './Startup/reducer';
import schedule  from './Schedule/reducer';
import login     from './Login/reducer';
import canteen   from './Canteen/reducer';
import settings  from './Settings/reducer';
import exercises from './Exercises/reducer';
import devtools  from './Devtools/reducer';
import absences  from './Absences/reducer';

const mainReducer = combineReducers({
    startup,
    schedule,
    login,
    canteen,
    settings,
    exercises,
    devtools,
    absences,
    navigation: NavigationReducer ,
});

function createStore () {
    const sagaMiddleware = createSagaMiddleware();

    const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
        : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(sagaMiddleware, ...middleware)
    );

    const createStoreWithNavigation = createNavigationEnabledStore({
        reduxCreateStore,
        navigationStateKey: 'navigation' ,
    });

    // const store = createStoreWithNavigation(reducer, enhancer);
    const store = createStoreWithNavigation(mainReducer, enhancer);

    sagaMiddleware.run(RootSaga);

    return store;
}

const store = createStore();

export default store;
