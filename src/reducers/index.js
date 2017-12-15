import { combineReducers } from 'redux';

const currentUser = (state = {}, action) => state;

const appReducers = combineReducers({
    currentUser: currentUser
});

export default appReducers;

