import constants from 'src/redux/constants'
import axios from 'axios'
import to from 'await-to-js'

const AppURL = constants.AppURL

const NotificationActions = {
	getNotifications: () => async dispatch => {
		dispatch(actions.getNotificationsRequest())
		const [err, response ] = await to(axios.get(`${AppURL}/currentuser/notifications`))
		if (err) dispatch(actions.getNotificationsError(err))
		else dispatch(actions.getNotificationsSuccess(response.data.reverse()))
	},
	deleteNotification: (item_id) => async dispatch => {
		dispatch(actions.deleteNotificationRequest())
		const [err, response ] = await to(axios.delete(`${AppURL}/currentuser/notifications/${item_id}`))
		if (err) dispatch(actions.deleteNotificationError(err))
		else {
			dispatch(actions.deleteNotificationSuccess(response))
			dispatch(NotificationActions.getNotifications())
		}
	},
	clearNotificationNumber: () => async dispatch => {
		dispatch(actions.clearNotificationNumberRequest())
		const [err, response ] = await to(axios.put(`${AppURL}/currentuser/notifications`))
		if (err) dispatch(actions.clearNotificationNumberError(err))
		else {
			dispatch(NotificationActions.setNotificationNumber(0))
			dispatch(actions.clearNotificationNumberSuccess(response))
		}
	},
	increaseNotificationNumber: () => ({
		type: constants.INCREASE_NOTIFICATION_NUMBER
	}),
	setNotificationNumber: (number) => ({
		type: constants.SET_NOTIFICATION_NUMBER,
		payload: number
	}),
	openSocket: () => ({
		type: constants.OPEN_SOCKET
	})
}

const actions = {
	getNotificationsRequest: () => ({
		type: constants.GET_NOTIFICATIONS_REQUEST
	}),
	getNotificationsSuccess: notifications => ({
		type: constants.GET_NOTIFICATIONS_SUCCESS,
		payload: notifications
	}),
	getNotificationsError: error => ({
		type: constants.GET_NOTIFICATIONS_FAILURE,
		payload: error
	}),
	deleteNotificationRequest: () => ({
		type: constants.DELETE_NOTIFICATION_REQUEST
	}),
	deleteNotificationSuccess: notifications => ({
		type: constants.DELETE_NOTIFICATION_SUCCESS,
		payload: notifications
	}),
	deleteNotificationError: error => ({
		type: constants.DELETE_NOTIFICATION_FAILURE,
		payload: error
	}),
	clearNotificationNumberRequest: () => ({
		type: constants.CLEAR_NOTIFICATION_REQUEST
	}),
	clearNotificationNumberSuccess: notifications => ({
		type: constants.CLEAR_NOTIFICATION_SUCCESS,
		payload: notifications
	}),
	clearNotificationNumberError: error => ({
		type: constants.CLEAR_NOTIFICATION_FAILURE,
		payload: error
	})
}

export default NotificationActions