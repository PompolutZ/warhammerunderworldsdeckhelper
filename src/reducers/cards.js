import { SET_VIEW } from "../actions/cards";

export const cardsView = (state = 'LINKS', action) => {
    switch(action.type) {
        case SET_VIEW: 
            return action.view.toUpperCase();
        default:
            return state;    
    }
}
