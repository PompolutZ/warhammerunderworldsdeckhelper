import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';
import { dbref } from '../utils/firebase';

const uuidv4 = require('uuid');

export default class Cards extends Component {
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
          if(cardsDb[card]) {
            cards.push(<Link className="cardLink" to={`/cards/${card}`} key={uuidv4()}>{card}</Link>)
          } else {
            cards.push(<div style={{display: 'flex'}} key={uuidv4()}>{card}</div>)
          }
          
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
  