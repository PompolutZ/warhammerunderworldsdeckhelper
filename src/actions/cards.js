export const SET_VIEW = 'SET_VIEW';
export const ADD_CARD = 'ADD_CARD';

export const setView = (view) => {
    return {
        type: SET_VIEW,
        view: view
    }
}