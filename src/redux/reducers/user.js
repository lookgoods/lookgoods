import constants from 'src/redux/constants'

const initialState = {
	currentUser: null,
	success: false,
	error: null,
	selectedUser: null
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
			currentUser: action.payload.user
		}

	case constants.GET_CURRENT_USER_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error
		}

	case constants.SET_SELECTED_USER:
		return {
			...state,
			selectedUser: {...action.payload}
		}
	
	case constants.LOGIN_FACEBOOK_FAILURE:
		console.log('login with facebook failed', action.payload)
		return state

	case constants.LOGIN_FACEBOOK_SUCCESS:
		console.log('login with facebook success', action.payload)
		return state

	default:
		return state
	}
}