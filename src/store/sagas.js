import { call, put, takeEvery, all } from 'redux-saga/effects'
import { incrementCount, decrementCount, setPosts, ASYNC_INCREMENT, ASYNC_DECREMENT, ASYNC_POSTS } from './reducers';
import {getFromAPIAxios} from '../API/API'

//counter

const delay = (ms) => new Promise ((res,rej)=>setTimeout(res,ms))

function* incrementWorker () {
    yield delay(1500);
    yield put(incrementCount())
}

function* decrementWorker () {
    yield delay(750);
    yield put(decrementCount())
}

function* countWatcher () {
    yield takeEvery(ASYNC_INCREMENT, incrementWorker)
    yield takeEvery(ASYNC_DECREMENT, decrementWorker)
}

//posts

export function* postsWorker(action) {
    const data = yield call(getFromAPIAxios,action.page,action.limit, action.api)
    // const json = yield call(()=> new Promise(res=>res(data.json()))) // its need when use fetch from native js
    yield put(setPosts(data))
}

function* postsWatcher () {
    yield takeEvery(ASYNC_POSTS, postsWorker)
}


//combine watchers

export function* rootWatcher () {
    yield all([countWatcher(), postsWatcher()])
}


