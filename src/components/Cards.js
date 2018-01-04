import React, {Component} from 'react';
import { Grid, Col, Row, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
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

      this.onViewChanged = this.onViewChanged.bind(this);
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
            cards.push(<Link className="cardLink" to={`/cards/${card}`} key={uuidv4()}>{`${card}: ${cardsDb[card]}`}</Link>)
          } 
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
            <Col>
            <FormGroup controlId="formControlsSelect">
              <ControlLabel>Select view:</ControlLabel>
              <FormControl componentClass="select" placeholder="select" onChange={this.props.onViewChange}>
                <option value="links">View as Links</option>
                <option value="scans">View As Scans</option>
              </FormControl>
            </FormGroup>
              {/* <DropdownButton role="menuitem">
                <MenuItem eventKey="1">View As Links</MenuItem>
                <MenuItem eventKey="1">View As Scans</MenuItem>
              </DropdownButton> */}
            </Col>
          </Row>
          <Row className="show-grid">
            <Col>
              <div style={{ marginLeft: 20}}>
                { cardsList }
              </div>
            </Col>
          </Row>
        </Grid>
      );
    }
  }
  