import constants from 'src/redux/constants'

const initialState = {
	chats: null,
	success: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {

	case constants.ADD_CHAT_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.ADD_CHAT_SUCCESS:
		return {
			...state,
			success: true,
			error: null
		}

	case constants.ADD_CHAT_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error
		}

	case constants.GET_CHAT_REQUEST:
		return {
			...state,
			success: false,
			error: null,
			chats: []
		}

	case constants.GET_CHAT_SUCCESS:
		if (action.payload.length) {
			return {
				...state,
				chats: action.payload,
				success: true,
				error: null
			}
		} else {
			return {
				...state,
				chats: [],
				success: true,
				error: null
			}
		}
			

	case constants.GET_CHAT_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error,
			chats: []
		}

	case constants.EDIT_CHAT_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.EDIT_CHAT_SUCCESS:
		return {
			...state,
			success: true,
			error: null
		}

	case constants.EDIT_CHAT_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error
		}	

	case constants.DELETE_CHAT_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.DELETE_CHAT_SUCCESS:
		return {
			...state,
			success: true,
			error: null
		}

	case constants.DELETE_CHAT_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error
		}

	default:
		return state
	}
}
