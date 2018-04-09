import constants from 'src/redux/constants'

const initialState = {
	currentPage: null
}

export default (state = initialState, action) => {
	switch (action.type) {

	case constants.SET_CURRENT_PAGE: 
		return {
			...state,
			currentPage: action.payload
		}

	default:
		return state
	}
}