import constants from 'src/redux/constants'

const initialState = {
	notifications: null,
	notifyNumber: 0,
	loading: false,
	error: null,
	isSocketOpen: false
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
    
	case constants.CLEAR_NOTIFICATION_NUMBER: 
		return {
			...state,
			notifyNumber: 0
		}
		
	case constants.OPEN_SOCKET: 
		return {
			...state,
			isSocketOpen: true
		}

	default:
		return state
	}
}