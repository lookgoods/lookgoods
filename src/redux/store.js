import { applyMiddleware, createStore } from 'redux'

import promise from 'redux-promise'
import rootReducer from 'src/redux/reducers/index'
import thunk from 'redux-thunk'

const store = createStore(
	rootReducer,
	applyMiddleware(thunk, promise)
)

export default store