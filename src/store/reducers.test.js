import { postsReducer, testAction, incrementCount,decrementCount, setPosts } from "./reducers";



describe('sync action testing', () => {
    let initialState;
    beforeEach(() => {
        initialState = {
            count: 0,
            test: [],
            posts: [],
        }
    })
    test('testAction', () => {
        let action = testAction();
        let newState = postsReducer(initialState, action);
        expect(newState.test).toHaveLength(1);
        expect(newState.test.length).toBe(1);
    })
    test('incrementCount', ()=> {
        let action = incrementCount();
        let newState = postsReducer(initialState, action);
        expect(newState.count).toBe(1);
    })
    test('decrementCount', ()=> {
        let action = decrementCount();
        let newState = postsReducer(initialState, action);
        expect(newState.count).toBe(-1);
    })
    test('decrement+increment Count', ()=> {
        let actionDecr = decrementCount();
        let actionIncr = incrementCount();
        let newState = postsReducer(initialState, actionDecr);
        let result = postsReducer(newState, actionIncr);
        expect(result.count).toBe(0);
    })
    test('setPosts', ()=> {
        let posts = [{post:1},{post:2},{post:3},{post:4},{post:5},{post:6}]
        let action = setPosts(posts);
        let newState = postsReducer(initialState, action);
        expect(newState.posts.length).toBe(6);
    })
})