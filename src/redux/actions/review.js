import constants from 'src/redux/constants'
import axios from 'axios'
import to from 'await-to-js'
import { Actions } from 'react-native-router-flux'
import UserActions from 'src/redux/actions/user'
import SearchActions from 'src/redux/actions/search'

const AppURL = constants.AppURL

const ReviewActions = {
	setCurrentReview: (review) => ({
		type: constants.SET_CURRENT_REVIEW,
		payload: review
	}),
	addReview: (review) => async dispatch => {
		dispatch(actions.addReviewRequest())
		try {
			const response = await fetch(`${AppURL}/reviews`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(review)
			})
			const data = await response.json()
			dispatch(actions.addReviewSuccess(data))
			Actions.tabMenu({ page: 'home' })
		} catch (err) {
			dispatch(actions.addReviewError(err))
		}
	},
	getReviews: () => async dispatch => {
		dispatch(actions.getReviewsRequest())
		const [err, response ] = await to(axios.get(`${AppURL}/reviews`))
		if (err) dispatch(actions.getReviewsError(err))
		else dispatch(actions.getReviewsSuccess(response.data.reverse()))
	},
	getReview: (review_id) => async dispatch => {
		dispatch(actions.getReviewRequest())
		const [err, response ] = await to(axios.get(`${AppURL}/reviews/${review_id}`))
		if (err) dispatch(actions.getReviewError(err))
		else dispatch(actions.getReviewSuccess(response.data))
	},
	getFollowingReviews: () => async dispatch => {
		dispatch(actions.getFollowingReviewRequest())
		const [err, response ] = await to(axios.get(`${AppURL}/currentuser/following/reviews`))
		if (err) dispatch(actions.getFollowingReviewError(err))
		else dispatch(actions.getFollowingReviewSuccess(response.data.reverse()))
	},
	editReview: (review, review_id) => async dispatch => {
		const trasformReview = {
			...review,
			product: {
				name: review.name,
				brand: review.brand
			}
		}
		delete trasformReview.name
		delete trasformReview.brand
		dispatch(actions.editReviewRequest())
		try {
			const response = await fetch(`${AppURL}/reviews/${review_id}`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(review)
			})
			dispatch(actions.editReviewSuccess(response))
			dispatch(ReviewActions.getReviews())
			dispatch(ReviewActions.getFollowingReviews())
			dispatch(UserActions.getCurrentUserOwnReviews())
			dispatch(ReviewActions.setCurrentReview(trasformReview))

		} catch (err) {
			dispatch(actions.editReviewError(err))
		}
	},
	deleteReview: (review_id) => async dispatch => {
		dispatch(actions.deleteReviewRequest())
		const [err, response ] = await to(axios.delete(`${AppURL}/reviews/${review_id}`))
		if (err) dispatch(actions.deleteReviewError(err))
		else {
			dispatch(actions.deleteReviewSuccess(response))
			dispatch(ReviewActions.getReviews())
			dispatch(ReviewActions.getFollowingReviews())
			dispatch(UserActions.getCurrentUserOwnReviews())
		}
	},
	saveReview: (review_id) => async dispatch => {
		dispatch(actions.saveReviewRequest())
		const [err, response ] = await to(axios.put(`${AppURL}/reviews/${review_id}/save`))
		if (err) {
			dispatch(actions.saveReviewError(err))
		}
		else {
			dispatch(actions.saveReviewSuccess(response))
			dispatch(UserActions.getCurrentUserSaveReviews())
			dispatch(UserActions.getCurrentUser())
		}
	},
	unsaveReview: (review_id) => async dispatch => {
		dispatch(actions.unsaveReviewRequest())
		const [err, response ] = await to(axios.put(`${AppURL}/reviews/${review_id}/unsave`))
		if (err) dispatch(actions.unsaveReviewError(err))
		else {
			dispatch(actions.unsaveReviewSuccess(response))
			dispatch(UserActions.getCurrentUserSaveReviews())
			dispatch(UserActions.getCurrentUser())
		}
	},
	likeReview: (review_id) => async dispatch => {
		dispatch(actions.likeReviewRequest())
		const [err, response ] = await to(axios.put(`${AppURL}/reviews/${review_id}/like`))
		if (err) dispatch(actions.likeReviewError(err))
		else {
			dispatch(actions.likeReviewSuccess(response))
			dispatch(ReviewActions.getFollowingReviews())
		}
	},
	unlikeReview: (review_id) => async dispatch => {
		dispatch(actions.unlikeReviewRequest())
		const [err, response ] = await to(axios.put(`${AppURL}/reviews/${review_id}/unlike`))
		if (err) dispatch(actions.unlikeReviewError(err))
		else {
			dispatch(actions.unlikeReviewSuccess(response))
			dispatch(ReviewActions.getFollowingReviews())
		}
	},
	viewTagReviews: (tag) => async dispatch => {
		await dispatch(SearchActions.searchByTag(tag))
		Actions.viewTagReviewsPage()
	}
}

const actions = {
	addReviewRequest: () => ({
		type: constants.ADD_REVIEW_REQUEST
	}),
	addReviewSuccess: response => ({
		type: constants.ADD_REVIEW_SUCCESS,
		payload: response
	}),
	addReviewError: error => ({
		type: constants.ADD_REVIEW_FAILURE,
		payload: error
	}),
	getReviewsRequest: () => ({
		type: constants.GET_REVIEWS_REQUEST
	}),
	getReviewsSuccess: reviews => ({
		type: constants.GET_REVIEWS_SUCCESS,
		payload: reviews
	}),
	getReviewsError: error => ({
		type: constants.GET_REVIEWS_FAILURE,
		payload: error
	}),
	getReviewRequest: () => ({
		type: constants.GET_REVIEW_REQUEST
	}),
	getReviewSuccess: review => ({
		type: constants.GET_REVIEW_SUCCESS,
		payload: review
	}),
	getReviewError: error => ({
		type: constants.GET_REVIEW_FAILURE,
		payload: error
	}),
	getFollowingReviewRequest: () => ({
		type: constants.GET_FOLLOWING_REVIEW_REQUEST
	}),
	getFollowingReviewSuccess: reviews => ({
		type: constants.GET_FOLLOWING_REVIEW_SUCCESS,
		payload: reviews
	}),
	getFollowingReviewError: error => ({
		type: constants.GET_FOLLOWING_REVIEW_FAILURE,
		payload: error
	}),
	editReviewRequest: () => ({
		type: constants.EDIT_REVIEW_REQUEST
	}),
	editReviewSuccess: reviews => ({
		type: constants.EDIT_REVIEW_SUCCESS,
		payload: reviews
	}),
	editReviewError: error => ({
		type: constants.EDIT_REVIEW_FAILURE,
		payload: error
	}),
	deleteReviewRequest: () => ({
		type: constants.DELETE_REVIEW_REQUEST
	}),
	deleteReviewSuccess: reviews => ({
		type: constants.DELETE_REVIEW_SUCCESS,
		payload: reviews
	}),
	deleteReviewError: error => ({
		type: constants.DELETE_REVIEW_FAILURE,
		payload: error
	}),
	saveReviewRequest: () => ({
		type: constants.SAVE_REVIEW_REQUEST
	}),
	saveReviewSuccess: response => ({
		type: constants.SAVE_REVIEW_SUCCESS,
		payload: response
	}),
	saveReviewError: error => ({
		type: constants.SAVE_REVIEW_FAILURE,
		payload: error
	}),
	unsaveReviewRequest: () => ({
		type: constants.UNSAVE_REVIEW_REQUEST
	}),
	unsaveReviewSuccess: response => ({
		type: constants.UNSAVE_REVIEW_SUCCESS,
		payload: response
	}),
	unsaveReviewError: error => ({
		type: constants.UNSAVE_REVIEW_FAILURE,
		payload: error
	}),
	likeReviewRequest: () => ({
		type: constants.LIKE_REVIEW_REQUEST
	}),
	likeReviewSuccess: response => ({
		type: constants.LIKE_REVIEW_SUCCESS,
		payload: response
	}),
	likeReviewError: error => ({
		type: constants.LIKE_REVIEW_FAILURE,
		payload: error
	}),
	unlikeReviewRequest: () => ({
		type: constants.UNLIKE_REVIEW_REQUEST
	}),
	unlikeReviewSuccess: response => ({
		type: constants.UNLIKE_REVIEW_SUCCESS,
		payload: response
	}),
	unlikeReviewError: error => ({
		type: constants.UNLIKE_REVIEW_FAILURE,
		payload: error
	})
}

export default ReviewActions