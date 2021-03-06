import constants from 'src/redux/constants'

const initialState = {
	currentReview: null,
	loading: false,
	error: null,
	reviews: null,
	followingReviews: null,
	tagReviews: null,
	tagName: '',
	reviewHistory: []
}

export default (state = initialState, action) => {
	switch (action.type) {
	case constants.SET_CURRENT_REVIEW:
		return {
			...state,
			currentReview: action.payload
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
			error: action.payload
		}

	case constants.GET_REVIEWS_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.GET_REVIEWS_SUCCESS:
		return {
			...state,
			loading: false,
			error: null,
			reviews: action.payload
		}

	case constants.GET_REVIEWS_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload
		}

	case constants.GET_REVIEW_REQUEST:
		return {
			...state,
			loading: true,
			error: null,
			currentReview: null
		}

	case constants.GET_REVIEW_SUCCESS:
		state.reviewHistory.push(action.payload)
		return {
			...state,
			loading: false,
			error: null,
			currentReview: state.reviewHistory[state.reviewHistory.length-1]
		}

	case constants.GET_REVIEW_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload
		}

	case constants.POP_HISTORY_REVIEW:
		state.reviewHistory.pop()
		return {
			...state,
			currentReview: state.reviewHistory[state.reviewHistory.length-1]
		}
	
	case constants.GET_FOLLOWING_REVIEW_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.GET_FOLLOWING_REVIEW_SUCCESS:
		return {
			...state,
			loading: false,
			error: null,
			followingReviews: action.payload
		}

	case constants.GET_FOLLOWING_REVIEW_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload.error
		}

	default:
		return state
	}
}
