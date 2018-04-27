import React, {Component} from 'react';
import { 
  Grid, 
  Col, 
  Row, 
  FormGroup, 
  FormControl, 
  ControlLabel, 
  Image, 
  Button,
  ButtonToolbar,
  ToggleButtonGroup,
  ToggleButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { dbref } from '../utils/firebase';
import { cardsDb } from '../data/index';
import AnimateHeight from 'react-animate-height';
import _ from 'lodash';

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
      this.handleSetFilterChange = this.onSetFilterChange.bind(this);
    }
  
    async componentDidMount() {
      try {
        // const cardsSnapshot = await dbref('/cardslist').once('value');
        // const cardsDb = cardsSnapshot.val();
        // this.setState({loading: false});
  
        // console.log('CardsList: ', cardsDb);
          
        console.log(_.keys(_.pickBy(cardsDb, (v, k) => v['set'] === 6)));  

        const cards = [];
        const leadingZeros = ['', '0', '00']
        for (let card in cardsDb) {
          const img = `01${leadingZeros[3 - card.toString().length]}${card}.png`;
          cards.push(<ImageCard img={img} number={card} name={cardsDb[card]['name']} key={`01${leadingZeros[3 - card.toString().length]}${card}`} />);
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

    onSetFilterChange(sets) {
      console.log(sets);
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
            <Col md={12}>
              <div>
                <ButtonToolbar>
                  <ToggleButtonGroup type="checkbox" onChange={this.onSetFilterChange}>
                    <ToggleButton value="1"><Image style={{width: 50}} src={`assets/icons/sepulchral-guard-icon.png`}  /></ToggleButton>
                    <ToggleButton value="2"><Image style={{width: 50}} src={`assets/icons/ironskulls-boyz-icon.png`}  /></ToggleButton>
                    <ToggleButton value="3"><Image style={{width: 50}} src={`assets/icons/the-chosen-axes-icon.png`}  /></ToggleButton>
                    <ToggleButton value="4"><Image style={{width: 50}} src={`assets/icons/spiteclaws-swarm-icon.png`}  /></ToggleButton>
                    <ToggleButton value="5"><Image style={{width: 50}} src={`assets/icons/magores-fiends-icon.png`}  /></ToggleButton>
                    <ToggleButton value="6"><Image style={{width: 50}} src={`assets/icons/the-farstriders-icon.png`}  /></ToggleButton>
                  </ToggleButtonGroup>
                </ButtonToolbar>                
              </div>
            </Col>
          </Row>
          
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
  