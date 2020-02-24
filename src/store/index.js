import {createStore, applyMiddleware, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import user from './user'

const reducers = combineReducers({
    user,
});

const initialState = {};

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(
        applyMiddleware(thunk),
    ),
);

export default store
