import constants from 'src/redux/constants'
import axios from 'axios'
import to from 'await-to-js'

const AppURL = constants.AppURL

const CommentActions = {
	addComment: (comment, review_id) => async dispatch => {
		dispatch(actions.addCommentRequest())
		try {
			const response = await fetch(`${AppURL}/reviews/${review_id}/comments`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(comment)
			})
			const data = await response.json()
			dispatch(actions.addCommentSuccess(data))
			dispatch(CommentActions.getComments(review_id))
		} catch (err) {
			dispatch(actions.addCommentError(err))
		}
	},
	getComments: (review_id) => async dispatch => {
		dispatch(actions.getCommentRequest())
		console.log(review_id, 'xxxxxx')
		const [err, response ] = await to(axios.get(`${AppURL}/reviews/${review_id}/comments`))
		if (err) {
			dispatch(actions.getCommentError(err))
		} 
		else {
			dispatch(actions.getCommentSuccess(response.data))
		}
	},
	editComment: (comment, review_id, comment_id) => async dispatch => {
		dispatch(actions.editCommentRequest())
		const [err, response ] = await to(axios.put(`${AppURL}/reviews/${review_id}/comments/${comment_id}`), comment)
		if (err) dispatch(actions.editCommentError(err))
		else {
			dispatch(actions.editCommentSuccess(response))
			dispatch(CommentActions.getComments(review_id))
		}
	},
	deleteComment: (review_id, comment_id) => async dispatch => {
		dispatch(actions.deleteCommentRequest())
		console.log(review_id, comment_id, 'delete')
		const [err, response ] = await to(axios.delete(`${AppURL}/reviews/${review_id}/comments/${comment_id}`))
		if (err) dispatch(actions.deleteCommentError(err))
		else {
			dispatch(actions.deleteCommentSuccess(response))
			dispatch(CommentActions.getComments(review_id))
		}
	},
	setEditComment: (review_id, comment_id) => async dispatch => {
		dispatch(actions.setEditComment(comment_id))
		dispatch(CommentActions.getComments(review_id))
	}
}

const actions = {
	addCommentRequest: () => ({
		type: constants.ADD_COMMENT_REQUEST
	}),
	addCommentSuccess: comments => ({
		type: constants.ADD_COMMENT_SUCCESS,
		payload: comments 
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
		payload: comments
	}),
	getCommentError: error => ({
		type: constants.GET_COMMENT_FAILURE,
		payload: { error }
	}),
	editCommentRequest: () => ({
		type: constants.EDIT_COMMENT_REQUEST
	}),
	editCommentSuccess: comments => ({
		type: constants.EDIT_COMMENT_SUCCESS,
		payload: { comments }
	}),
	editCommentError: error => ({
		type: constants.EDIT_COMMENT_FAILURE,
		payload: { error }
	}),
	deleteCommentRequest: () => ({
		type: constants.DELETE_COMMENT_REQUEST
	}),
	deleteCommentSuccess: comments => ({
		type: constants.DELETE_COMMENT_SUCCESS,
		payload: comments 
	}),
	deleteCommentError: error => ({
		type: constants.DELETE_COMMENT_FAILURE,
		payload: { error }
	}),
	setEditComment: comment => ({
		type: constants.SET_EDIT_COMMENT,
		payload: comment
	})
}

export default CommentActions