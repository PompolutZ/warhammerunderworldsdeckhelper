import React, { Component } from 'react';
import firebase, { auth } from '../utils/firebase';
import { Button } from 'react-bootstrap';

class Login extends Component {
    async componentDidMount() {
        const r = await auth.getRedirectResult();
        if (r.credential) {

        }
    }

    handleClick() {
        const provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithRedirect(provider);
    }

    render() {
        return <Button onClick={this.handleClick}>Login</Button>;
    }
}

export default Login;