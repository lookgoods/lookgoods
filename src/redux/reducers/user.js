import {
	GET_FACEBOOK_USER_FAILURE,
	GET_FACEBOOK_USER_REQUEST,
	GET_FACEBOOK_USER_SUCCESS
} from 'src/redux/constants'

const initialState = {
	currentUser: {
		clientId: null, 
		name: null,
		picture_profile: null
	},
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case GET_FACEBOOK_USER_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}
	case GET_FACEBOOK_USER_SUCCESS:
		return {
			...state,
			loading: false,
			currentUser: {
				clientId: action.payload.user.clientId,
				name: action.payload.user.name,
				picture_profile: action.payload.user.picture_profile
			}
		}
	case GET_FACEBOOK_USER_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload.error
		}

	default:
		return state
	}
}