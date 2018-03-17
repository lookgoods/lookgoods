import { combineReducers } from 'redux'
import userReducer from 'src/redux/reducers/user'
import reviewReducer from 'src/redux/reducers/review'

export default combineReducers({
    userReducer,
    reviewReducer
})