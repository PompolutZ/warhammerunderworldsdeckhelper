import React, { Component } from 'react';
import firebase, { auth } from '../utils/firebase';
import { Button } from 'react-bootstrap';
import { setCurrentUser } from '../actions/auth';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class LoginContainer extends Component {
    async componentDidMount() {
        const r = await auth.getRedirectResult();
        if (r.credential) {
            const {email, displayName, uid} = r.user;
            this.props.OnLogin(email, uid, displayName);
            this.props.history.push('/mydecks');
        }
    }

    handleClick() {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithRedirect(provider);
    }

    render() {
        return <Button onClick={this.handleClick}>Login using Facebook</Button>;
    }
}

const mapDispatchToProps = dispatch => ({
    OnLogin: (email, uid, name) => {
        console.log('Ping!');
        dispatch(setCurrentUser(email, uid, name));
    } 
});

const Login = connect(null, mapDispatchToProps)(withRouter(LoginContainer));

export default Login;