import React, { Component } from 'react';
import { dbref } from '../../utils/firebase';
import { Grid, Row, Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import * as _ from 'lodash';
import './index.css';

const uuidv4 = require('uuid');

const DeckThumbnail = ({ data }) => (
    <div className="deckThumbnail">
        <NavLink to={`/deck/${data.id}`}>{data.title}</NavLink>
    </div>
);

const DeckThumbnailsRow = ({ decks }) => {
    const cols = decks.map(d => <Col key={uuidv4()} sm={6} md={3}><DeckThumbnail data={d} /></Col>) 
    return (
        <Row className="show-grid">
            {cols}
        </Row>
    );
}

export default class Decks extends Component {
    state = {
        loading: true,
        decks: []
    }

    async componentDidMount() {
        try {
            const decksSnapshot = await dbref('/decks').once('value');
            const decks = decksSnapshot.val();
            console.log(decks);
            this.setState({loading: false});
            const temp = [];
            for (let d in decks) {
                temp.push(decks[d]);
            }
    
            this.setState({decks: temp});
        } catch(error) {
            console.log(error);
        }
    }

    render() {
        const rows = _.chunk(this.state.decks, 3).map(chunk => <DeckThumbnailsRow key={uuidv4()} decks={chunk} />) 

        return (
            <Grid>
                {rows}
            </Grid>
        );
    }
}