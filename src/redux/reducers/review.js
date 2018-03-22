import {
	SET_CURRENT_REVIEW
} from 'src/redux/constants'

const initialState = {
	currentReview: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case SET_CURRENT_REVIEW: 
		console.log('payload', action.payload)
		return {
			...state,
			currentReview: {...action.payload}
		}

	default:
		return state
	}
}