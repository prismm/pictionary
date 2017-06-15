import { createStore, applyMiddleware } from 'redux';
import reducer from './stateActions/reducer'

export default function(initialState) {
    return createStore(
        reducer,
        initialState
    );
}