import constants from 'src/redux/constants'

const initialState = {
	currentReview: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case constants.SET_CURRENT_REVIEW: 
		return {
			...state,
			currentReview: {...action.payload}
		}

	default:
		return state
	}
}