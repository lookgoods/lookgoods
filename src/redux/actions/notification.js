import constants from 'src/redux/constants'
import axios from 'axios'
import to from 'await-to-js'

const AppURL = constants.AppURL

const NotificationActions = {
	getNotifications: () => async dispatch => {
		dispatch(actions.getNotificationsRequest())
		const [err, response ] = await to(axios.get(`${AppURL}/currentuser/notifications`))
		if (err) dispatch(actions.getNotificationsError(err))
		else dispatch(actions.getNotificationsSuccess(response.data))
	},
	increaseNotificationNumber: () => ({
		type: constants.INCREASE_NOTIFICATION_NUMBER
	}),
	clearNotificationNumber: () => ({
		type: constants.CLEAR_NOTIFICATION_NUMBER
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
	})
}

export default NotificationActions