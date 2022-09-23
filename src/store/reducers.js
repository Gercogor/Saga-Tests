const TEST = "TEST"
export const SET_POSTS = "SET_POSTS"
export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const ASYNC_INCREMENT = "ASYNC_INCREMENT"
export const ASYNC_DECREMENT = "ASYNC_DECREMENT"
export const ASYNC_POSTS = "ASYNC_POSTS"
export const ASYNC_POSTS_FAILED = "ASYNC_POSTS_FAILED"

const initialState = {
    count: 0,
    test: [],
    posts: [],
}

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TEST:
            return {...state, test: [...state.test,action.payload]}
        case SET_POSTS:
            return {...state, posts: action.payload}
        case INCREMENT:
            return {...state, count: state.count+1}
        case DECREMENT:
            return {...state, count: state.count-1}
        default: 
            return state;
    }
}

export const incrementCount = () => ({
    type: INCREMENT
})
export const asyncIncrementCount = () => ({
    type: ASYNC_INCREMENT
})

export const decrementCount = () => ({
    type: DECREMENT
})
export const asyncDecrementCount = () => ({
    type: ASYNC_DECREMENT
})

export const testAction = () => ({
    type: TEST,
    payload: 'test',
})

export const setPosts = (payload) => ({
    type: SET_POSTS,
    payload,
})
export const asyncSetPosts = (page,limit, api) => ({
    type: ASYNC_POSTS,
    page,
    limit,
    api,
})