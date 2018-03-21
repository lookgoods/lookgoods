import constants from 'src/redux/constants'

const AppURL = constants.AppURL

async function loginWithFacebook(token) {
	let response
	try {
		response = await fetch(`${AppURL}/auth/facebook/token`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'Cache-Control': 'no-cache'
			},
			body: JSON.stringify({
				access_token: token
			})
		})
	} catch (err) {
		console.log(err, 'loginWithFacebook error')
		return err
	}
	console.log(response, 'loginWithFacebook')
	return response
}

export const UserActions = {
	loginWithFacebook: (token) => async dispatch => {
		loginWithFacebook(token)
	},
	getCurrentUser: () => async dispatch => {
		dispatch(actions.getCurrentUserRequest())
		try {
			let response, data
			response = await fetch(`${AppURL}/currentuser`)
			data = await response.json()
			dispatch(actions.getCurrentUserSuccess(data))

		} catch (error) {
			dispatch(actions.getCurrentUserError(error))
		}
	}
}

const actions = {
	getCurrentUserRequest: () => ({
		type: constants.GET_CURRENT_USER_REQUEST
	}),
	getCurrentUserSuccess: user => ({
		type: constants.GET_CURRENT_USER_SUCCESS,
		payload: { user }
	}),
	getCurrentUserError: error => ({
		type: constants.GET_CURRENT_USER_FAILURE
	})
}

export default actions
