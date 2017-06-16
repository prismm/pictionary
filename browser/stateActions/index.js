import axios from 'axios';


/*---------------- ACTION CREATORS -----------------*/
//CREATING AND SENDING ACTIONS TO REDUCER

const initialState = {
    players: [],
    whoseTurn: {},
    strokes: {}
}

export const addPlayer = (player) => ({
    type: 'ADD_PLAYER',
    player
})

export const removePlayer = (player) => ({
    type: 'REMOVE_PLAYER',
    player
})

export const assignName = (player, name) => ({
    type: 'ASSIGN_USERNAME',
    player,
    name
})

/*------------------REDUCER------------------------*/
//UPDATES STATE BASED ON ACTION TYPE

export default function rootReducer(state = initialState, action) {

    const newState = Object.assign({}, state);

    switch (action.type) {
        case 'ASSIGN_USERNAME':
            // newState = newState.players.map(player => {
            //     if (player.id === action.player.id) { player.name = action.name }
            // })
            break;
        case 'CLEAR_STROKES':
            newState.strokes = {};
            break;
        case 'NEW_TURN':
            // checks whether to go to next player or to circle back to first player for turn
            // const len = newState.players.length;
            // const nextInd = newState.players.indexOf(newState.whoseTurn) + 1;    

            // if (newState.players[nextInd]) {
            //     newState.whoseTurn = newState.players[nextInd]
            // } else {
            //     newState.whoseTurn = newState.players[0]
            // }

            // //sets player's turn to true
            // newState.whoseTurn.yourTurn = true;

            break;
        case 'ADD_PLAYER':
            newState.players = newState.players.concat([action.player]);
        case 'REMOVE_PLAYER':
            newState.players = newState.players.filter(player => {
                if (player.id === action.player.id) {
                    return false;
                } else {
                    return true;
                }
            })
        default:
            break;
    }
    return newState;
}


/*----------------- DISPATCHERS ----------------------*/
//GET OR POST DATA TO BACKEND

export const clearStrokes = () => {
    axios.get('/api/strokes')
        .then(res => dispatch)
}

export const fetchPlayers = () => dispatch => {
    //???
}