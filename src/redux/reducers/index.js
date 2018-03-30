import { combineReducers } from 'redux'
import reviewReducer from 'src/redux/reducers/review'
import userReducer from 'src/redux/reducers/user'
import imageReducer from 'src/redux/reducers/image'

export default combineReducers({
	userReducer,
	reviewReducer,
	imageReducer
})