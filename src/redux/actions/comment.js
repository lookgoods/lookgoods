import constants from 'src/redux/constants'
import axios from 'react-native-axios'
import to from 'await-to-js'

const AppURL = constants.AppURL
const TestURL = constants.TestURL

const ReviewActions = {
	addComment: (comment, review_id) => async dispatch => {
		dispatch(actions.addCommentRequest())
		const [ err, response ] = await to(axios.post(`${TestURL}/reviews/${review_id}`), comment)
		if (err) dispatch(actions.addCommentError(err))
		else dispatch(actions.addCommentSuccess(response))
	},
	getComments: (review_id) => async dispatch => {
		dispatch(actions.getCommentRequest())
		const [err, response ] = await to(axios.get(`${TestURL}/reviews/${review_id}`))
		if (err) dispatch(actions.getCommentError(err))
		else dispatch(actions.getCommentSuccess(response))
	},
	editReview: (review) => async dispatch => {
		dispatch(actions.getReviewRequest())
		const [err, response ] = await to(axios.put(`${TestURL}/reviews`), review)
		if (err) dispatch(actions.getReviewError(err))
		else dispatch(actions.getReviewSuccess(response))
	}
}

const actions = {
	addCommentRequest: () => ({
		type: constants.ADD_COMMENT_REQUEST
	}),
	addCommentSuccess: response => ({
		type: constants.ADD_COMMENT_SUCCESS,
		payload: { response }
	}),
	addCommentError: error => ({
		type: constants.ADD_COMMENT_FAILURE,
		payload: { error }
	}),
	getCommentRequest: () => ({
		type: constants.GET_COMMENT_REQUEST
	}),
	getCommentSuccess: comments => ({
		type: constants.GET_COMMENT_SUCCESS,
		payload: { comments }
	}),
	getCommentError: error => ({
		type: constants.GET_COMMENT_FAILURE,
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