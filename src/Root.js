import React from 'react';
import { Provider, connect } from 'react-redux';

import App from './App';
import { clearCurrentUser } from './actions/auth';

const mapStateToProps = state => {
    return {
        currentUser: state.user,
        isAuthed: state.user !== null
    }
}

const mapDispatchToProps = dispatch => ({
    OnLogout: () => dispatch(clearCurrentUser())
});
    

const Application = connect(mapStateToProps, mapDispatchToProps)(App);

const Root = ({ store }) => (
    <Provider store={store}>
        <Application />
    </Provider>
);

export default Root;