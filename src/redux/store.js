import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from 'src/redux/reducers/index'
import promise from 'redux-promise'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, promise)
)

export default store