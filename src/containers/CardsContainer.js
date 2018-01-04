import { connect } from 'react-redux';
import { setView } from "../actions/cards";
import Cards from '../components/Cards';

const mapStateToProps = state => {
    return { activeView: state.cardsView }
}

const mapDispatchToProps = dispatch => {
    return {
        onViewChange: (e) => {
            console.log("PING!");
            dispatch(setView(e.target.value));
        }
    } 
}

export const CardsContainer = connect(mapStateToProps, mapDispatchToProps)(Cards);