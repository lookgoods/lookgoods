import constants from 'src/redux/constants'
import axios from 'axios'
import to from 'await-to-js'

const AppURL = constants.AppURL

const UserActions = {
	loginWithFacebook: token => async dispatch => {
		dispatch(actions.loginFacebookRequest())
		const [err, response] = await to(
			axios.post(`${AppURL}/auth/facebook/token`, {
				access_token: token
			})
		)
		if (err) dispatch(actions.loginFacebookError(err))
		else dispatch(actions.loginFacebookSuccess(response))
	},
	getCurrentUser: () => async dispatch => {
		dispatch(actions.getCurrentUserRequest())
		const [err, response] = await to(axios.get(`${AppURL}/currentuser`))
		if (err) dispatch(actions.getCurrentUserError(err))
		else dispatch(actions.getCurrentUserSuccess(response.data))
	},
	setSelectedUser: user => ({
		type: constants.SET_SELECTED_USER,
		payload: user
	}),
	changeUserDescription: (user_id, description) => async dispatch => {
		dispatch(actions.changeUserDescriptionRequest())
		const [err, response] = await to(
			axios.put(`${AppURL}/users/${user_id}`, {
				description: description
			})
		)
		if (err) dispatch(actions.changeUserDescriptionError(err))
		else {
			dispatch(actions.changeUserDescriptionSuccess(response))
			dispatch(UserActions.getCurrentUser())
		}
	},
	getUser: user_id => async dispatch => {
		dispatch(actions.getUserRequest())
		const [err, response] = await to(axios.get(`${AppURL}/users/${user_id}`))
		if (err) dispatch(actions.getUserError(err))
		else {
			dispatch(actions.getUserSuccess(response.data))
		}
	},
	getUserReviews: user_id => async dispatch => {
		dispatch(actions.getUserReviewsRequest())
		const [err, response] = await to(
			axios.get(`${AppURL}/users/${user_id}/reviews`)
		)
		if (err) dispatch(actions.getUserReviewsError(err))
		else {
			dispatch(actions.getUserReviewsSuccess(response))
		}
	},
	followUser: user_id => async dispatch => {
		dispatch(actions.followUserRequest())
		const [err, response] = await to(
			axios.get(`${AppURL}/users/${user_id}/follow`)
		)
		if (err) dispatch(actions.followUserError(err))
		else {
			dispatch(UserActions.getCurrentUser())
			dispatch(actions.followUserSuccess(response))
			console.log(response, 'follow success')
		}
	},
	unfollowUser: user_id => async dispatch => {
		dispatch(actions.unfollowUserRequest())
		const [err, response] = await to(
			axios.get(`${AppURL}/users/${user_id}/unfollow`)
		)
		if (err) dispatch(actions.unfollowUserError(err))
		else {
			dispatch(UserActions.getCurrentUser())
			dispatch(actions.unfollowUserSuccess(response))
			console.log(response, 'unfollow success')
		}
	},
	getFollowerUsers: user_id => async dispatch => {
		dispatch(actions.getFollowerUsersRequest())
		const [err, response] = await to(
			axios.get(`${AppURL}/users/${user_id}/follower`)
		)
		if (err) dispatch(actions.getFollowerUsersError(err))
		else {
			dispatch(actions.getFollowerUsersSuccess(response))
		}
	},
	getFollowingUsers: user_id => async dispatch => {
		dispatch(actions.getFollowingUsersRequest())
		const [err, response] = await to(
			axios.get(`${AppURL}/users/${user_id}/following`)
		)
		if (err) dispatch(actions.getFollowingUsersError(err))
		else {
			dispatch(actions.getFollowingUsersSuccess(response))
		}
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
	changeUserDescriptionSuccess: response => ({
		type: constants.CHANGE_USER_DESCRIPTION_SUCCESS,
		payload: { response }
	}),
	changeUserDescriptionError: error => ({
		type: constants.CHANGE_USER_DESCRIPTION_FAILURE,
		payload: { error }
	}),
	getUserRequest: () => ({
		type: constants.GET_USER_REQUEST
	}),
	getUserSuccess: user => ({
		type: constants.GET_USER_SUCCESS,
		payload: { user }
	}),
	getUserError: error => ({
		type: constants.GET_USER_FAILURE,
		payload: { error }
	}),
	getUserReviewsRequest: () => ({
		type: constants.GET_USER_REVIEWS_REQUEST
	}),
	getUserReviewsSuccess: user => ({
		type: constants.GET_USER_REVIEWS_SUCCESS,
		payload: { user }
	}),
	getUserReviewsError: error => ({
		type: constants.GET_USER_REVIEWS_FAILURE,
		payload: { error }
	}),
	followUserRequest: () => ({
		type: constants.FOLLOW_USER_REQUEST
	}),
	followUserSuccess: user => ({
		type: constants.FOLLOW_USER_SUCCESS,
		payload: { user }
	}),
	followUserError: error => ({
		type: constants.FOLLOW_USER_FAILURE,
		payload: { error }
	}),
	unfollowUserRequest: () => ({
		type: constants.UNFOLLOW_USER_REQUEST
	}),
	unfollowUserSuccess: user => ({
		type: constants.UNFOLLOW_USER_SUCCESS,
		payload: { user }
	}),
	unfollowUserError: error => ({
		type: constants.UNFOLLOW_USER_FAILURE,
		payload: { error }
	}),
	getFollowerUsersRequest: () => ({
		type: constants.GET_FOLLOWER_USERS_REQUEST
	}),
	getFollowerUsersSuccess: users => ({
		type: constants.GET_FOLLOWER_USERS_SUCCESS,
		payload: { users }
	}),
	getFollowerUsersError: error => ({
		type: constants.GET_FOLLOWER_USERS_FAILURE,
		payload: { error }
	}),
	getFollowingUsersRequest: () => ({
		type: constants.GET_FOLLOWING_USERS_REQUEST
	}),
	getFollowingUsersSuccess: users => ({
		type: constants.GET_FOLLOWING_USERS_SUCCESS,
		payload: { users }
	}),
	getFollowingUsersError: error => ({
		type: constants.GET_FOLLOWING_USERS_FAILURE,
		payload: { error }
	})
}

export default UserActions
