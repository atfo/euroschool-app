import * as types from './types';

export default [
    types.header('Moneweb'),
    
    types.text('moneweb.username', 'Username', '', 'email-address'),

    types.text('moneweb.password', 'Password', '', 'default', true),

    types.header('Developer Tools'),

    types.label('Be careful with these.'),

    types.dispatchButton('Purge Local State', () => ({ type: 'debug.RESET_STATE' })),

    types.button('Open State Transition Explorer (BROKEN, DO NOT USE!)', () => {
        throw new Error('What did I just say?');
    }),

    types.header('Meta'),
    
    types.label('Version $$RELEASE$$'),
];
