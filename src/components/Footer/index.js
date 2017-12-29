import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';

export default class Footer extends Component {
    render(){
        return (
            <footer className="footer">
                <div>Designed and developed by <a className="link" href="https://github.com/PompolutZ">PompolutZ</a></div>
                <div>Source code on <a className="link" href="https://github.com/PompolutZ/warhammerunderworldsdeckhelper">Github</a></div>
                <div style={{color: 'black', fontStyle: 'italic'}}>The information presented on this site, both literal and graphical, is copyrated by Games Workshop.</div>
                <div style={{color: 'black', fontStyle: 'italic'}}>This website is not produced, endorsed, supported, or affiliated with Games Workshop.</div>
            </footer>
        );
    }
}