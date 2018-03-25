import { combineReducers } from 'redux'
import reviewReducer from 'src/redux/reducers/review'
import userReducer from 'src/redux/reducers/user'

export default combineReducers({
	userReducer,
	reviewReducer
})