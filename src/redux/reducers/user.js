import constants from 'src/redux/constants'

const initialState = {
	currentUser: null,
	success: false,
	error: null,
	selectedUser: null,
	user: null,
	ownReviews: null,
	saveReviews: null,
	ownOtherReviews: null,
	saveOtherReviews: null,
	userHistory: [],
	ownReviewsHistory: [],
	users: []
}

export default (state = initialState, action) => {
	switch (action.type) {
	case constants.GET_CURRENT_USER_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.GET_CURRENT_USER_SUCCESS:
		return {
			...state,
			success: true,
			currentUser: action.payload
		}

	case constants.GET_CURRENT_USER_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}

	case constants.SET_SELECTED_USER:
		return {
			...state,
			selectedUser: action.payload
		}
	
	case constants.LOGIN_FACEBOOK_FAILURE:
		console.log('login with facebook failed', action.payload)
		return state

	case constants.LOGIN_FACEBOOK_SUCCESS:
		console.log('login with facebook success', action.payload)
		return state

	case constants.GET_USER_REQUEST:
		return {
			...state,
			success: false,
			error: null,
			user: null
		}

	case constants.GET_USER_SUCCESS:
		state.userHistory.push(action.payload)
		return {
			...state,
			success: true,
			user: state.userHistory[state.userHistory.length-1]
		}

	case constants.GET_USER_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}

	case constants.POP_HISTORY_USER:
		state.userHistory.pop()
		state.ownReviewsHistory.pop()
		return {
			...state,
			success: true,
			user: state.userHistory[state.userHistory.length-1],
			ownOtherReviews: state.ownReviewsHistory[state.ownReviewsHistory.length-1]
		}

	case constants.GET_USER_OWN_REVIEWS_REQUEST:
		return {
			...state,
			success: false,
			error: null,
			ownOtherReviews: null
		}

	case constants.GET_USER_OWN_REVIEWS_SUCCESS:
		state.ownReviewsHistory.push(action.payload)
		return {
			...state,
			success: true,
			ownOtherReviews: state.ownReviewsHistory[state.ownReviewsHistory.length-1]
		}

	case constants.GET_USER_OWN_REVIEWS_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}
	
	case constants.GET_USER_SAVE_REVIEWS_REQUEST:
		return {
			...state,
			success: false,
			error: null,
			saveOtherReviews: null
		}

	case constants.GET_USER_SAVE_REVIEWS_SUCCESS:
		return {
			...state,
			success: true,
			saveOtherReviews: action.payload
		}

	case constants.GET_USER_SAVE_REVIEWS_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}
	
	case constants.GET_CURRENTUSER_OWN_REVIEWS_REQUEST:
		return {
			...state,
			success: false,
			error: null,
			ownReviews: null,
			saveReviews: null
		}

	case constants.GET_CURRENTUSER_OWN_REVIEWS_SUCCESS:
		return {
			...state,
			success: true,
			ownReviews: action.payload
		}

	case constants.GET_CURRENTUSER_OWN_REVIEWS_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}
	
	case constants.GET_CURRENTUSER_SAVE_REVIEWS_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.GET_CURRENTUSER_SAVE_REVIEWS_SUCCESS:
		return {
			...state,
			success: true,
			saveReviews: action.payload
		}

	case constants.GET_CURRENTUSER_SAVE_REVIEWS_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}
	
	case constants.GET_USER_FOLLOWER_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.GET_USER_FOLLOWER_SUCCESS:
		return {
			...state,
			success: true,
			users: action.payload
		}

	case constants.GET_USER_FOLLOWER_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}
	
	case constants.GET_USER_FOLLOWING_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.GET_USER_FOLLOWING_SUCCESS:
		return {
			...state,
			success: true,
			users: action.payload
		}

	case constants.GET_USER_FOLLOWING_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}

	case constants.GET_USERS_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.GET_USERS_SUCCESS:
		return {
			...state,
			success: true,
			users: action.payload
		}

	case constants.GET_USERS_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload
		}

	default:
		return state
	}
}