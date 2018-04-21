import constants from 'src/redux/constants'

const initialState = {
	notifications: [],
	notifyNumber: 0,
	success: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {

	case constants.GET_NOTIFICATIONS_REQUEST: 
		return {
			...state,
			notifications: [],
			success: false,
			error: null
		}

	case constants.GET_NOTIFICATIONS_SUCCESS: 
		return {
			...state,
			success: true,
			error: null,
			notifications: action.payload
		}

	case constants.GET_NOTIFICATIONS_FAILURE: 
		return {
			...state,
			error: action.payload,
			success: false,
			notifications: []
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

	default:
		return state
	}
}