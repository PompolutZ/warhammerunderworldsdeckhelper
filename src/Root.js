import React from 'react';
import { Provider, connect } from 'react-redux';

import App from './App';

const mapStateToProps = state => {
    return {
        currentUser: state.currentUser,
        isAuthed: state.currentUser !== null
    }
}

const Application = connect(mapStateToProps)(App);

const Root = ({ store }) => (
    <Provider store={store}>
        <Application />
    </Provider>
);

export default Root;