import constants from 'src/redux/constants'

const initialState = {
	currentReview: null,
	loading: false,
	error: null,
	reviews: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case constants.SET_CURRENT_REVIEW:
		return {
			...state,
			currentReview: { ...action.payload }
		}

	case constants.ADD_REVIEW_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.ADD_REVIEW_SUCCESS:
		return {
			...state,
			loading: false,
			error: null
		}

	case constants.ADD_REVIEW_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload.error
		}

	case constants.GET_REVIEW_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.GET_REVIEW_SUCCESS:
		return {
			...state,
			loading: false,
			error: null,
			reviews: action.payload.reviews
		}

	case constants.GET_REVIEW_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload.error
		}

	default:
		return state
	}
}
