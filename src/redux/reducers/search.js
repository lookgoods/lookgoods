import constants from 'src/redux/constants'

const initialState = {
	reviews: null,
	products: null,
	tags: null,
	users: null,
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {
	case constants.SEARCH_BY_TITLE_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.SEARCH_BY_TITLE_SUCCESS:
		console.log(action.payload, 'SEARCH_BY_TITLE_SUCCESS')
		return {
			...state,
			reviews: action.payload,
			loading: false,
			error: null
		}

	case constants.SEARCH_BY_TITLE_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload
		}
    
	case constants.SEARCH_BY_PRODUCT_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.SEARCH_BY_PRODUCT_SUCCESS:
		console.log(action.payload, 'SEARCH_BY_PRODUCT_SUCCESS')
		return {
			...state,
			products: action.payload,
			loading: false,
			error: null
		}

	case constants.SEARCH_BY_PRODUCT_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload
		}
    
	case constants.SEARCH_BY_USER_REQUEST:
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.SEARCH_BY_USER_SUCCESS:
		console.log(action.payload, 'SEARCH_BY_USER_SUCCESS')
		return {
			...state,
			users: action.payload,
			loading: false,
			error: null
		}

	case constants.SEARCH_BY_USER_FAILURE:
		return {
			...state,
			loading: false,
			error: action.payload
		}

	default:
		return state
	}
}


