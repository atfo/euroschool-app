import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Text, ScrollView, RefreshControl } from 'react-native';
import { Button, Heading, View } from '@shoutem/ui';
import TimeAgo from 'react-native-timeago';
import * as actions from './actions';
import styles from '../../styles';

// This is the bit where I wank off a horse to make debugging work.
// Except it actually breaks everything. Don't wank off horses, kids.

/* eslint-disable */
// const _XHR = GLOBAL.originalXMLHttpRequest ?
//     GLOBAL.originalXMLHttpRequest :
//     GLOBAL.XMLHttpRequest
//
// XMLHttpRequest = _XHR
/* eslint-enable */



class Balance extends Component {
    static propTypes = {
        loadBalance: PropTypes.func,
        loaded: PropTypes.bool,
        loading: PropTypes.bool,
        loadFailed: PropTypes.bool,
        balance: PropTypes.string,
        refreshBalanceInBackground: PropTypes.func,
        lastUpdate: PropTypes.number,
    };

    componentDidMount() {
        this.props.loadBalance();
    }

    render() {
        if (this.props.loadFailed) {
            return (
                <View style={styles.core.screenContainer}>
                    <Text>Could not access balance.</Text>
                    <Text>Please make sure you have set your credentials in settings.</Text>
                    <Button onPress={this.props.loadBalance}>
                        <Text>RETRY</Text>
                    </Button>
                </View>
            );
        }
        return (
            <ScrollView
                style={styles.core.screenContainer}
                refreshControl={<RefreshControl
                    refreshing={this.props.loading}
                    onRefresh={this.props.loadBalance}
                />}
            >
                {/* The double nested view is so the pull-to-refresh appears  */}
                {/* directly below the navbar but the content still has space */}
                <View style={{ marginTop: 56 }}>
                    <Heading styleName="" style={{ fontSize: 28 }}>€{this.props.balance}</Heading>
                    <Text>Last updated <TimeAgo time={this.props.lastUpdate} /></Text>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = (state) => ({
    balance: state.canteen.balance,
    loading: state.canteen.loadInProgress,
    loaded: state.canteen.loaded,
    loadFailed: state.canteen.loadFailed,
    lastUpdate: state.canteen.lastUpdate,
});

const mapDispatchToProps = (dispatch) => ({
    loadBalance: () => dispatch(actions.loadBalance()),
    refreshBalanceInBackground: () => dispatch(actions.refreshBalanceInBackground()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Balance);
