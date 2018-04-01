import constants from 'src/redux/constants'
import axios from 'react-native-axios'
import to from 'await-to-js'
import { Actions } from 'react-native-router-flux'

const AppURL = constants.AppURL
const TestURL = constants.TestURL

const ReviewActions = {
	setCurrentReview: (review) => ({
		type: constants.SET_CURRENT_REVIEW,
		payload: review
	}),
	addReview: (review) => async dispatch => {
		dispatch(actions.addReviewRequest())
		try {
			const response = await fetch(`${TestURL}/reviews`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(review)
			})
			const data = await response.json()
			dispatch(actions.addReviewSuccess(data))
			Actions.tabMenu()
		} catch (err) {
			dispatch(actions.addReviewError(err))
		}
	},
	getReviews: () => async dispatch => {
		dispatch(actions.getReviewRequest())
		const [err, response ] = await to(axios.get(`${TestURL}/reviews`))
		if (err) dispatch(actions.getReviewError(err))
		else dispatch(actions.getReviewSuccess(response))
	},
	editReview: (review) => async dispatch => {
		dispatch(actions.getReviewRequest())
		const [err, response ] = await to(axios.put(`${TestURL}/reviews`), review)
		if (err) dispatch(actions.getReviewError(err))
		else dispatch(actions.getReviewSuccess(response))
	}
}

const actions = {
	addReviewRequest: () => ({
		type: constants.ADD_REVIEW_REQUEST
	}),
	addReviewSuccess: response => ({
		type: constants.ADD_REVIEW_SUCCESS,
		payload: { response }
	}),
	addReviewError: error => ({
		type: constants.ADD_REVIEW_FAILURE,
		payload: { error }
	}),
	getReviewRequest: () => ({
		type: constants.GET_REVIEW_REQUEST
	}),
	getReviewSuccess: reviews => ({
		type: constants.GET_REVIEW_SUCCESS,
		payload: { reviews }
	}),
	getReviewError: error => ({
		type: constants.GET_REVIEW_FAILURE,
		payload: { error }
	}),
	editReviewRequest: () => ({
		type: constants.EDIT_REVIEW_REQUEST
	}),
	editReviewSuccess: reviews => ({
		type: constants.EDIT_REVIEW_SUCCESS,
		payload: { reviews }
	}),
	editReviewError: error => ({
		type: constants.EDIT_REVIEW_FAILURE,
		payload: { error }
	})
}

export default ReviewActions