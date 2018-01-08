import React, { Component } from 'react';
import { dbref, storage } from '../utils/firebase';
import { Image, Grid, Row, Col } from 'react-bootstrap';

const splitFactionWords = (faction) => {
    switch(faction) {
        case `STEELHEARTLIBERATORS`:
            return `STEELHEART'S LIBERATORS`;
        case `GARREKREAVERS`:
            return `GARREK'S REAVERS`;
            
        default:
            return `GENERIC`;    
    }
}

class Card extends Component {
    state = {
      card: null,
      url: null
    }
  
    async componentDidMount() {
      try {
        console.log("Card: ", this.props.match.params.number);
        const cardSnapshot = await dbref(`/cardsdesc/${this.props.match.params.number}`).once('value');
        console.log("Card: ", cardSnapshot.val());
        this.setState({card: cardSnapshot.val()});
      } catch(error) {
        console.log("Error while loading card: ", error);  
      }

      try {
        const cardUrl = await storage.refFromURL(`gs://wudeckhelper.appspot.com/cards_x5/${this.props.match.params.number}.jpg`).getDownloadURL();
        this.setState({url: cardUrl});
      } catch (error) {
        console.log('Error loading image: ', error);
      }
    }
  
    render() {
      const image = this.state.url ? <Image src={this.state.url} responsive /> : <span></span>
      // const score = this.state.card.score ? <div>{`Score: ${this.state.card.score} glory points`}</div> : <span></span>;
      // const subtype = this.state.card.subtype ? (` - ${this.state.card.subtype}`) : <span></span>
      // const multiplayer = this.state.card.rule34 ? <div>{`In multiplayer game: ${this.state.card.rule34}`}</div> : <span></span>;
      // const restricted = this.state.card.restriction ? <div><b>Restricted to: </b>{this.state.card.restriction}</div> : <span></span>;
      return (
        <Grid>
          <Row>
            <Col xs={10}>
              { image }
            </Col>
          </Row>
        </Grid>
        // <div>
        //   { image }
        //   {/* <h2>{this.state.card.name}</h2>
        //   <div><b>Faction: </b>{splitFactionWords(this.state.card.faction)}</div>
        //   <div><b>Type: </b>{this.state.card.type}{subtype}</div>
        //   <div><i>{this.state.card.fluff}</i></div>
        //   <div>{this.state.card.rule}</div>
        //   { multiplayer }
        //   { score }
        //   { restricted } */}
        // </div>
      );
    }
  }
  
  export default Card;