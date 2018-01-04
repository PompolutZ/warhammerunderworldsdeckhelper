import { combineReducers } from 'redux';
import { cardsView } from './cards';

const currentUser = (state = {}, action) => state;

const appReducers = combineReducers({
    currentUser,
    cardsView
});

export default appReducers;

