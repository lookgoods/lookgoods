import constants from 'src/redux/constants'

const initialState = {
	comments: null,
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case constants.ADD_COMMENT_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.ADD_COMMENT_SUCCESS:
		return {
			...state,
			comments: action.payload.comments,
			loading: false,
			error: null
		}

	case constants.ADD_COMMENT_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload.error
		}

	case constants.GET_COMMENT_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}


	default:
		return state
	}
}
