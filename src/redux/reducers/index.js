import { combineReducers } from 'redux'
import reviewReducer from 'src/redux/reducers/review'
import userReducer from 'src/redux/reducers/user'
import imageReducer from 'src/redux/reducers/image'
import commentReducer from 'src/redux/reducers/comment'

export default combineReducers({
	userReducer,
	reviewReducer,
	imageReducer,
	commentReducer
})