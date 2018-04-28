import constants from 'src/redux/constants'

const initialState = {
	notifications: null,
	loading: false,
	error: null,
	isSocketOpen: false,
	notifyNumber: 0
}

export default (state = initialState, action) => {
	switch (action.type) {

	case constants.GET_NOTIFICATIONS_REQUEST: 
		return {
			...state,
			notifications: null,
			loading: true,
			error: null
		}

	case constants.GET_NOTIFICATIONS_SUCCESS: 
		return {
			...state,
			loading: false,
			error: null,
			notifications: action.payload
		}

	case constants.GET_NOTIFICATIONS_FAILURE: 
		return {
			...state,
			error: action.payload,
			loading: false,
			notifications: null
		}
    
	case constants.INCREASE_NOTIFICATION_NUMBER: 
		return {
			...state,
			notifyNumber: state.notifyNumber + 1
		}
    
	case constants.SET_NOTIFICATION_NUMBER:
		return {
			...state,
			notifyNumber: action.payload
		}
		
	case constants.OPEN_SOCKET: 
		return {
			...state,
			isSocketOpen: true
		}

	case constants.CLEAR_NOTIFICATION_SUCCESS: 
		return {
			...state,
			notifications: []
		}

	default:
		return state
	}
}