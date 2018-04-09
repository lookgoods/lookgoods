import constants from 'src/redux/constants'

const initialState = {
	comments: null,
	success: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case constants.ADD_COMMENT_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.ADD_COMMENT_SUCCESS:
		return {
			...state,
			success: true,
			error: null
		}

	case constants.ADD_COMMENT_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error
		}

	case constants.GET_COMMENT_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.GET_COMMENT_SUCCESS:
		return {
			...state,
			comments: action.payload,
			success: true,
			error: null
		}

	case constants.GET_COMMENT_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error
		}	

	case constants.EDIT_COMMENT_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.EDIT_COMMENT_SUCCESS:
		return {
			...state,
			success: true,
			error: null
		}

	case constants.EDIT_COMMENT_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error
		}	

	case constants.DELETE_COMMENT_REQUEST:
		return {
			...state,
			success: false,
			error: null
		}

	case constants.DELETE_COMMENT_SUCCESS:
		return {
			...state,
			success: true,
			error: null
		}

	case constants.DELETE_COMMENT_FAILURE:
		return {
			...state,
			success: false,
			error: action.payload.error
		}	

	default:
		return state
	}
}
