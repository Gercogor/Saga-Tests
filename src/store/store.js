import {applyMiddleware, combineReducers, createStore} from "redux";
import createSagaMiddleware from 'redux-saga';
import { postsReducer } from "./reducers";
import { rootWatcher } from "./sagas";

const sagaMiddleware = createSagaMiddleware()

let rootReducer = combineReducers({
    posts: postsReducer,
});


let store = createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootWatcher)

// window.store=store;

export default store; 