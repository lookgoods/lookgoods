import constants from 'src/redux/constants'
import axios from 'react-native-axios'
import to from 'await-to-js'

const AppURL = constants.AppURL

const UserActions = {
	loginWithFacebook: (token) => async dispatch => {
		dispatch(actions.loginFacebookRequest())
		const [ err, response ] = await to(axios.post(`${AppURL}/auth/facebook/token`, {
			access_token: token
		}))
		if (err) dispatch(actions.loginFacebookError(err))
		else dispatch(actions.loginFacebookSuccess(response))
	},
	getCurrentUser: () => async dispatch => {
		dispatch(actions.getCurrentUserRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/currentuser`))
		if (err) dispatch(actions.getCurrentUserError(err))
		else dispatch(actions.getCurrentUserSuccess(response.data))
	},
	setSelectedUser: (user) => ({
		type: constants.SET_SELECTED_USER,
		payload: user
	}),
	changeUserDescription: (user_id, description) => async dispatch => {
		dispatch(actions.changeUserDescriptionRequest())
		const [ err, response ] = await to(axios.put(`${AppURL}/users/${user_id}`, {
			description: description
		}))
		if (err) dispatch(actions.changeUserDescriptionError(err))
		else dispatch(actions.changeUserDescriptionSuccess(response))
	}
}

const actions = {
	loginFacebookRequest: () => ({
		type: constants.LOGIN_FACEBOOK_REQUEST
	}),
	loginFacebookSuccess: response => ({
		type: constants.LOGIN_FACEBOOK_SUCCESS,
		payload: { response }
	}),
	loginFacebookError: error => ({
		type: constants.LOGIN_FACEBOOK_FAILURE,
		payload: { error }
	}),
	getCurrentUserRequest: () => ({
		type: constants.GET_CURRENT_USER_REQUEST
	}),
	getCurrentUserSuccess: user => ({
		type: constants.GET_CURRENT_USER_SUCCESS,
		payload: { user }
	}),
	getCurrentUserError: error => ({
		type: constants.GET_CURRENT_USER_FAILURE,
		payload: { error }
	}),
	changeUserDescriptionRequest: () => ({
		type: constants.CHANGE_USER_DESCRIPTION_REQUEST
	}),
	changeUserDescriptionSuccess: (response) => ({
		type: constants.CHANGE_USER_DESCRIPTION_SUCCESS,
		payload: { response }
	}),
	changeUserDescriptionError: error => ({
		type: constants.CHANGE_USER_DESCRIPTION_FAILURE,
		payload: { error }
	})
}

export default UserActions
