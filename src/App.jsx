import './App.css';
import React, { useState, useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { testAction, incrementCount, decrementCount, asyncIncrementCount, asyncDecrementCount, asyncSetPosts } from './store/reducers';

const SettingModal = React.lazy(() => import('./SettingModal/SettingModal'))

function App() {

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [api, setApi] = useState('posts')
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch();

  const counter = useSelector(state => state.posts.count)
  const posts = useSelector(state => state.posts.posts)
  const test = useSelector(state => state.posts.test)

  useEffect(() => {

  }, [])

  const testDispatch = () => {
    dispatch(testAction())
  }

  const increment = () => {
    dispatch(incrementCount())
  }

  const decrement = () => {
    dispatch(decrementCount())
  }

  const incrementAsync = () => {
    dispatch(asyncIncrementCount())
  }

  const decrementAsync = () => {
    dispatch(asyncDecrementCount())
  }

  const getPosts = (page, limit, api) => {
    console.log(api)
    dispatch(asyncSetPosts(page, limit, api))
  }

  const changePage = (e) => {
    setPage(+e.target.value)
  }

  const changeLimit = (e) => {
    setLimit(+e.target.value)
  }

  const changeValue = (e) => {
    setApi(e.target.value)
  }


  return (
    <div className="App">
      <div>
        <button onClick={testDispatch}>
          TEST STORE
        </button>
        <div className='test-store'>
          {
            test.map((elem, index) =>
              <span key={elem + index}>{elem}</span>
            )
          }
        </div>
      </div>

      <div>
        <p className='counter'>{counter}</p>
        <div>
          <button onClick={decrement}>
            Decrement redux sync
          </button>
          <button onClick={increment}>
            Increment redux sync
          </button>
        </div>
        <div>
          <button onClick={decrementAsync}>
            Decrement saga async
          </button>
          <button onClick={incrementAsync}>
            Increment saga async
          </button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: '15px' }}>
          ITEM LIST
          {
            posts.map((elem, index) =>
              <p data-testid='arrayElem' className='list-elem' key={index}>{
                elem.title || elem.name
              }</p>
            )
          }
        </div>
        <button data-testid='apiBtn' onClick={() => getPosts(page, limit, api)}>
          get posts
        </button>
        <button data-testid='settingBtn' onClick={() => setVisible(visible => !visible)}>
          IO settings
        </button>
      </div>

      <Suspense fallback={<div>Загрузка...</div>}>
        <SettingModal visible={visible} setVisible={setVisible} page={page} limit={limit} changePage={changePage} changeLimit={changeLimit} api={api} setApi={changeValue} />
      </Suspense>


    </div>
  );
}

export default App;
