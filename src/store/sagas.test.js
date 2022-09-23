import {postsWorker} from './sagas'
import { setPosts } from './reducers'
import {getFromAPIAxios} from '../API/API'
import { call, put } from 'redux-saga/effects'


describe('FetchPosts', ()=>{
    it('fetches data', ()=>{
        const action = {
            page: 1,
            limit: 10,
            api: 'posts',
        }
        const generator = postsWorker(action)

        expect(generator.next().value).toEqual(call(getFromAPIAxios, action.page, action.limit, action.api))
       
        const posts = [{
            id: '1'
        }]
        
        expect(generator.next(posts).value).toEqual(put(setPosts(posts)))

        expect(generator.next().done).toBe(true)
    })
})