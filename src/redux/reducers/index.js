import { combineReducers } from 'redux'
import reviewReducer from 'src/redux/reducers/review'
import userReducer from 'src/redux/reducers/user'
import imageReducer from 'src/redux/reducers/image'
import commentReducer from 'src/redux/reducers/comment'
import chatReducer from 'src/redux/reducers/chat'
import menuReducer from 'src/redux/reducers/menu'
import searchReducer from 'src/redux/reducers/search'
import notificationReducer from 'src/redux/reducers/notification'

export default combineReducers({
	userReducer,
	reviewReducer,
	imageReducer,
	commentReducer,
	chatReducer,
	menuReducer,
	searchReducer,
	notificationReducer
})