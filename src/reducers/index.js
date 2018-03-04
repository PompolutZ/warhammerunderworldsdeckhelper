import { combineReducers } from 'redux';
import { cardsView } from './cards';
import user from './auth';

const appReducers = combineReducers({
    user: user,
    cardsView: cardsView
});

export default appReducers;

