import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { dbref } from './utils/firebase';
import logo from './logo.svg';
import './App.css';
import Card from './components/Card';

const uuidv4 = require('uuid/v4');


class Cards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cards: [],
      error: '',
      loading: true
    }
  }

  async componentDidMount() {
    try {
      const cardsSnapshot = await dbref('/cards').once('value');
      const cardsDb = cardsSnapshot.val();
      this.setState({loading: false});

      console.log('CardsList: ', cardsDb);
      const cards = [];
      for (let card in cardsDb) {
        const { name } = cardsDb[card];
        cards.push(<Link className="cardLink" to={`/cards/${card}`} key={uuidv4()}>{name}</Link>)
      }

      this.setState({cards: cards});
    } catch (error) {

    }
  }

  render() {
    const cardsList = this.state.loading ? <span>Loading...</span> : this.state.cards;

    if(this.state.error) {
      return <h1>Error: {this.state.error}.</h1>
    }
    return (
      <div>
        <div style={{ marginLeft: 20}}>
          { cardsList }
        </div>
      </div>
    );
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
                  </Nav>
                  {/* <Nav pullRight>
                    <LinkContainer to="/Login">
                      <NavItem eventKey={1}>
                        Login
                      </NavItem>
                    </LinkContainer>
                  </Nav> */}
                </Navbar.Collapse>
              </Navbar>
            </header>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/cards" component={Cards} />
              <Route path="/cards/:number?" component={Card} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
