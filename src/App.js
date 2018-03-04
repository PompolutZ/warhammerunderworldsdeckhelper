import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem, Glyphicon, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { dbref } from './utils/firebase';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';
import Cards from './components/Cards';
import Warbands from './components/Warbands';
import Decks from './components/Decks/index';
import Deck from './components/Deck';
import Expansions from './components/Expansions';
import Footer from './components/Footer';
import Login from './containers/Login';
import { CardsContainer } from './containers/CardsContainer';

const uuidv4 = require('uuid/v4');



const Home = () => (
  <h1>Home</h1>
);

const LogoutButton = () => (
  <LinkContainer to="/login">
    <NavItem>
      <div></div>
    </NavItem>
  </LinkContainer>

);

const App = ({ currentUser, isAuthed, OnLogout }) => {
  
  const Auth = () => {
    if(isAuthed) {
      return <Button onClick={OnLogout}>Logout</Button>;
    }  else {
      return (
        <LinkContainer to="/login">
          <NavItem eventKey={1}>
            Login
          </NavItem>
        </LinkContainer>
      )
    }
};

  return (
    <div className="App">
      <Router>
        <div>
          <header className="App-header">
            <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary" collapseOnSelect>
              <LinkContainer to="/">
                <Navbar.Header>
                  <Navbar.Brand>
                    Deck Helper
                  </Navbar.Brand>
                  <Navbar.Toggle />
                </Navbar.Header>
              </LinkContainer>
              <Navbar.Collapse>
                <Nav>
                  <LinkContainer to="/cards">
                    <NavItem eventKey={1}>
                      CARDS
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/decks">
                    <NavItem eventKey={1}>
                      DECKS
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/warbands">
                    <NavItem eventKey={1}>
                      WARBANDS
                    </NavItem>
                  </LinkContainer>
                  <LinkContainer to="/expansions">
                    <NavItem eventKey={1}>
                      EXPANSIONS
                    </NavItem>
                  </LinkContainer>
                </Nav>
                <Nav pullRight>
                  <Auth />
                </Nav>
              </Navbar.Collapse>
            </Navbar>
          </header>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cards" component={CardsContainer} />
            <Route exact path="/decks" component={Decks} />
            <Route exact path="/warbands" component={Warbands} />
            <Route exact path="/expansions" component={Expansions} />
            <Route exact path="/login" component={Login} />
            <Route path="/cards/:number?" component={Card} />
            <Route path="/deck/:id?" component={Deck} />
          </Switch>
            <Footer />
        </div>
      </Router>
    </div>);
//   return (<div className="App">
// </div>)
};

export default App;
