const initialState = {
    currentUser: null,
}

export default function reducer(state = initialState, action) {

    switch (action.type) {
        case 'ASSIGN_USERNAME':
            return state;
        default:
            return state;
    }
}