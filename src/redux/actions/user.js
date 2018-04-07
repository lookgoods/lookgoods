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
		const [ err, response ] = await to(axios.put(`${AppURL}/currentuser/follow/users/${user_id}`))
		if (err) dispatch(actions.followUserError(err))
		else {
			dispatch(UserActions.getCurrentUser())
			dispatch(actions.followUserSuccess(response))
		}
	},
	unfollowUser: user_id => async dispatch => {
		dispatch(actions.unfollowUserRequest())
		const [ err, response ] = await to(axios.put(`${AppURL}/currentuser/unfollow/users/${user_id}`))
		if (err) dispatch(actions.unfollowUserError(err))
		else {
			dispatch(UserActions.getCurrentUser())
			dispatch(actions.unfollowUserSuccess(response))
		}
	},
	getUserOwnReviews: (user_id) => async dispatch => {
		dispatch(actions.getUserOwnReviewsRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/users/${user_id}/ownpostlist`))
		if (err) dispatch(actions.getUserOwnReviewsError(err))
		else {
			dispatch(actions.getUserOwnReviewsSuccess(response.data))
		}
	},
	getUserSaveReviews: (user_id) => async dispatch => {
		dispatch(actions.getUserSaveReviewsRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/users/${user_id}/savepostlist`))
		if (err) dispatch(actions.getUserSaveReviewsError(err))
		else {
			dispatch(actions.getUserSaveReviewsSuccess(response.data))
		}
	},
	getCurrentUserOwnReviews: () => async dispatch => {
		dispatch(actions.getCurrentUserOwnReviewsRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/currentuser/ownpostlist`))
		if (err) dispatch(actions.getCurrentUserOwnReviewsError(err))
		else {
			dispatch(actions.getCurrentUserOwnReviewsSuccess(response.data))
		}
	},
	getCurrentUserSaveReviews: () => async dispatch => {
		dispatch(actions.getCurrentUserSaveReviewsRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/currentuser/savepostlist`))
		if (err) dispatch(actions.getCurrentUserSaveReviewsError(err))
		else {
			dispatch(actions.getCurrentUserSaveReviewsSuccess(response.data))
		}
	},
	getUserFollower: (user_id) => async dispatch => {
		dispatch(actions.getUserFollowerRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/users/${user_id}/follower`))
		if (err) dispatch(actions.getUserFollowerError(err))
		else {
			dispatch(actions.getUserFollowerSuccess(response.data))
		}
	},
	getUserFollowing: (user_id) => async dispatch => {
		dispatch(actions.getUserFollowingRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/users/${user_id}/following`))
		if (err) dispatch(actions.getUserFollowingError(err))
		else {
			dispatch(actions.getUserFollowingSuccess(response.data))
		}
	},
	getCurrentUserFollower: () => async dispatch => {
		dispatch(actions.getCurrentUserFollowerRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/currentuser/follower`))
		if (err) dispatch(actions.getCurrentUserFollowerError(err))
		else {
			dispatch(actions.getCurrentUserFollowerSuccess(response.data))
		}
	},
	getCurrentUserFollowing: () => async dispatch => {
		dispatch(actions.getCurrentUserFollowingRequest())
		const [ err, response ] = await to(axios.get(`${AppURL}/currentuser/following`))
		if (err) dispatch(actions.getCurrentUserFollowingError(err))
		else {
			dispatch(actions.getCurrentUserFollowingrSuccess(response.data))
		}
	}
}

const actions = {
	loginFacebookRequest: () => ({
		type: constants.LOGIN_FACEBOOK_REQUEST
	}),
	loginFacebookSuccess: response => ({
		type: constants.LOGIN_FACEBOOK_SUCCESS,
		payload: response
	}),
	loginFacebookError: error => ({
		type: constants.LOGIN_FACEBOOK_FAILURE,
		payload: error
	}),
	getCurrentUserRequest: () => ({
		type: constants.GET_CURRENT_USER_REQUEST
	}),
	getCurrentUserSuccess: user => ({
		type: constants.GET_CURRENT_USER_SUCCESS,
		payload: user
	}),
	getCurrentUserError: error => ({
		type: constants.GET_CURRENT_USER_FAILURE,
		payload: error
	}),
	changeUserDescriptionRequest: () => ({
		type: constants.CHANGE_USER_DESCRIPTION_REQUEST
	}),
	changeUserDescriptionSuccess: response => ({
		type: constants.CHANGE_USER_DESCRIPTION_SUCCESS,
		payload: response
	}),
	changeUserDescriptionError: error => ({
		type: constants.CHANGE_USER_DESCRIPTION_FAILURE,
		payload: error
	}),
	getUserRequest: () => ({
		type: constants.GET_USER_REQUEST
	}),
	getUserSuccess: user => ({
		type: constants.GET_USER_SUCCESS,
		payload: user
	}),
	getUserError: error => ({
		type: constants.GET_USER_FAILURE,
		payload: error
	}),
	getUserReviewsRequest: () => ({
		type: constants.GET_USER_REVIEWS_REQUEST
	}),
	getUserReviewsSuccess: user => ({
		type: constants.GET_USER_REVIEWS_SUCCESS,
		payload: user
	}),
	getUserReviewsError: error => ({
		type: constants.GET_USER_REVIEWS_FAILURE,
		payload: error
	}),
	followUserRequest: () => ({
		type: constants.FOLLOW_USER_REQUEST
	}),
	followUserSuccess: user => ({
		type: constants.FOLLOW_USER_SUCCESS,
		payload: user
	}),
	followUserError: error => ({
		type: constants.FOLLOW_USER_FAILURE,
		payload: error
	}),
	unfollowUserRequest: () => ({
		type: constants.UNFOLLOW_USER_REQUEST
	}),
	unfollowUserSuccess: user => ({
		type: constants.UNFOLLOW_USER_SUCCESS,
		payload: user
	}),
	unfollowUserError: error => ({
		type: constants.UNFOLLOW_USER_FAILURE,
		payload: error
	}),
	getUserOwnReviewsRequest: () => ({
		type: constants.GET_USER_OWN_REVIEWS_REQUEST
	}),
	getUserOwnReviewsSuccess: (reviews) => ({
		type: constants.GET_USER_OWN_REVIEWS_SUCCESS,
		payload: reviews
	}),
	getUserOwnReviewsError: error => ({
		type: constants.GET_USER_OWN_REVIEWS_FAILURE,
		payload: error
	}),
	getUserSaveReviewsRequest: () => ({
		type: constants.GET_USER_SAVE_REVIEWS_REQUEST
	}),
	getUserSaveReviewsSuccess: (reviews) => ({
		type: constants.GET_USER_SAVE_REVIEWS_SUCCESS,
		payload: reviews
	}),
	getUserSaveReviewsError: error => ({
		type: constants.GET_USER_SAVE_REVIEWS_FAILURE,
		payload: error
	}),
	getCurrentUserOwnReviewsRequest: () => ({
		type: constants.GET_CURRENTUSER_OWN_REVIEWS_REQUEST
	}),
	getCurrentUserOwnReviewsSuccess: (reviews) => ({
		type: constants.GET_CURRENTUSER_OWN_REVIEWS_SUCCESS,
		payload: reviews
	}),
	getCurrentUserOwnReviewsError: error => ({
		type: constants.GET_CURRENTUSER_OWN_REVIEWS_FAILURE,
		payload: error
	}),
	getCurrentUserSaveReviewsRequest: () => ({
		type: constants.GET_CURRENTUSER_SAVE_REVIEWS_REQUEST
	}),
	getCurrentUserSaveReviewsSuccess: (reviews) => ({
		type: constants.GET_CURRENTUSER_SAVE_REVIEWS_SUCCESS,
		payload: reviews
	}),
	getCurrentUserSaveReviewsError: error => ({
		type: constants.GET_CURRENTUSER_SAVE_REVIEWS_FAILURE,
		payload: error
	}),
	getUserFollowerRequest: () => ({
		type: constants.GET_USER_FOLLOWER_REQUEST
	}),
	getUserFollowerSuccess: (users) => ({
		type: constants.GET_USER_FOLLOWER_SUCCESS,
		payload: users
	}),
	getUserFollowerError: error => ({
		type: constants.GET_USER_FOLLOWER_FAILURE,
		payload: error
	}),
	getUserFollowingRequest: () => ({
		type: constants.GET_USER_FOLLOWING_REQUEST
	}),
	getUserFollowingSuccess: (users) => ({
		type: constants.GET_USER_FOLLOWING_SUCCESS,
		payload: users
	}),
	getUserFollowingError: error => ({
		type: constants.GET_USER_FOLLOWING_FAILURE,
		payload: error
	}),
	getCurrentUserFollowerRequest: () => ({
		type: constants.GET_CURRENTUSER_FOLLOWER_REQUEST
	}),
	getCurrentUserFollowerSuccess: (users) => ({
		type: constants.GET_CURRENTUSER_FOLLOWER_SUCCESS,
		payload: users
	}),
	getCurrentUserFollowerError: error => ({
		type: constants.GET_CURRENTUSER_FOLLOWER_FAILURE,
		payload: error
	}),
	getCurrentUserFollowingRequest: () => ({
		type: constants.GET_CURRENTUSER_FOLLOWING_REQUEST
	}),
	getCurrentFollowingSuccess: (users) => ({
		type: constants.GET_CURRENTUSER_FOLLOWING_SUCCESS,
		payload: users
	}),
	getCurrentFollowingError: error => ({
		type: constants.GET_CURRENTUSER_FOLLOWING_FAILURE,
		payload: error
	})
}

export default UserActions
