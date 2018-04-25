import React, {Component} from 'react';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dbref } from '../utils/firebase';
import { cardsDb } from '../data/index';
import AnimateHeight from 'react-animate-height';

const uuidv4 = require('uuid');

class ImageCard extends Component {
  state = {
    height: 0,
  };
 
  toggle = () => {
    const { height } = this.state;
 
    this.setState({
      height: height === 0 ? 'auto' : 0,
    });
  };
 
  render() {
    const { height } = this.state;
 
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <Button bsStyle='link' onClick={ this.toggle } style={{ marginLeft: 0, marginBottom: 10 }}>
          { height === 0 ? `${this.props.number}. ${this.props.name}` : 'Shrink!' }
        </Button>
 
        <AnimateHeight 
          duration={ 175 }
          height={ height } // see props documentation bellow
        >
          <Image 
            style={{ marginBottom: 10 }}
            src={`assets/cards/${this.props.img}`} 
            responsive />
        </AnimateHeight>
      </div>
    );
  }
}

export default class Cards extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        cards: [],
        error: '',
        loading: false
      }

      this.onViewChanged = this.onViewChanged.bind(this);
    }
  
    async componentDidMount() {
      try {
        // const cardsSnapshot = await dbref('/cardslist').once('value');
        // const cardsDb = cardsSnapshot.val();
        // this.setState({loading: false});
  
        // console.log('CardsList: ', cardsDb);
        const cards = [];
        const leadingZeros = ['', '0', '00']
        for (let card in cardsDb) {
          const img = `01${leadingZeros[3 - card.toString().length]}${card}.png`;
          cards.push(<ImageCard img={img} number={card} name={cardsDb[card]['name']} />);
          // if(cardsList[card]) {

          //   //cards.push(<Link className="cardLink" to={`/cards/${card}`} key={uuidv4()}>{`${card}: ${cardsList[card]}`}</Link>)
          // } 
        }
  
        this.setState({cards: cards});
      } catch (error) {
  
      }
    }

    onViewChanged(e) {
      console.log(e.target.value);
    }
  
    render() {
      const cardsList = this.state.loading ? <span>Loading...</span> : this.state.cards;
      console.log(this.props);
      if(this.state.error) {
        return <h1>Error: {this.state.error}.</h1>
      }
      return (
        <Grid>
          <Row className="show-grid">
            <Col md={4}>
              <div style={{ marginLeft: 20}}>
                { cardsList }
              </div>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
  