import axios from 'axios';

/*--------------- ACTIONS -----------------------*/
//CONSTANT NAMES USED IN ACTION CREATORS FOR UPDATING STATE


/*---------------- ACTION CREATORS -----------------*/
//CREATING AND SENDING ACTIONS TO REDUCER

const initialState = {
    currentUser: null,
}

/*------------------REDUCER------------------------*/
//UPDATES STATE BASED ON ACTION TYPE

export default function rootReducer(state = initialState, action) {

    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'ASSIGN_USERNAME':
            break;
        case 'CLEAR_STROKES':
            newState.strokes = {};
            break;
        default:
            break;
    }
    return newState;
}


/*----------------- DISPATCHERS ----------------------*/
//GET OR POST DATA TO BACKEND

export const clearStrokes = () => {
    axios.delete('/api/strokes')
        .then(res => dispatch)
}