import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { dbref } from './utils/firebase';
import logo from './logo.svg';
import './App.css';

class CardsEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      error: ''
    }
  }

  async componentDidMount() {
    try {
      const cardsSnapshot = await dbref('/cardslist').once('value');
      console.log('CardsList: ', cardsSnapshot.val());
    } catch (error) {

    }
  }

  render() {
    if(this.state.error) {
      return <h1>Error: {this.state.error}.</h1>
    }
    return <h1>Cards Editor</h1>
  }
}

const Home = () => (
  <h1>Home</h1>
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <header className="App-header">
              <Navbar>
                <LinkContainer to="/">
                  <Navbar.Header>
                    <Navbar.Brand>
                      Deck Helper
                    </Navbar.Brand>
                  </Navbar.Header>
                </LinkContainer>
                <Nav>
                  <LinkContainer to="/editor">
                    <NavItem eventKey={1}>
                      EDITOR
                    </NavItem>
                  </LinkContainer>
                </Nav>
              </Navbar>
            </header>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/editor" component={CardsEditor} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
