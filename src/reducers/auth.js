import { SET_CURRENT_USER, CLEAR_CURRENT_USER } from '../actions/auth';

const user = (state = null, action) => {
    switch(action.type) {
        case SET_CURRENT_USER:
            console.log('SET CURRENT USER');
            return Object.assign({}, state, {displayName: action.data.displayName, email: action.data.email, uid: action.data.uid});

        case CLEAR_CURRENT_USER:
            return null;

        default: 
            return state;
    }
}

export default user;

