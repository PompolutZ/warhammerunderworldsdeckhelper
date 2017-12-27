import React, { Component } from 'react';
import { dbref, auth } from '../../utils/firebase';

export default class Deck extends Component {
    state = {
        title: '',
        author: '',
        description: '',
        objective: [],
        power: []
    }

    async componentDidMount() {
        const snapshot = await dbref(`/decks/${this.props.match.params.id}`).once('value');
        const { title, author, description, objective, power } = snapshot.val();
        
        this.setState({
            title: title,
            author: author, 
            description: description,
            objective: objective,
            power: power
        });
    }

    render() {
        return (
            <div>
                <h2>{this.state.title}</h2>
                <div><b>Author:</b>{this.state.author}</div>
                <div><b>Description:</b>{this.state.description}</div>
                <div></div>
            </div>
        );
    }
}