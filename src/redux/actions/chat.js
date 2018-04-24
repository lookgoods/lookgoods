import constants from 'src/redux/constants'
import axios from 'axios'
import to from 'await-to-js'

const AppURL = constants.AppURL

const ChatActions = {
	// addComment: (comment, review_id) => async dispatch => {
	// 	dispatch(actions.addCommentRequest())
	// 	try {
	// 		const response = await fetch(`${AppURL}/reviews/${review_id}/comments`, {
	// 			method: 'post',
	// 			headers: {
	// 				'Content-Type': 'application/json'
	// 			},
	// 			body: JSON.stringify(comment)
	// 		})
	// 		const data = await response.json()
	// 		dispatch(actions.addCommentSuccess(data))
	// 		dispatch(CommentActions.getComments(review_id))
	// 	} catch (err) {
	// 		dispatch(actions.addCommentError(err))
	// 	}
	// },
	getChats: (review_id) => async dispatch => {
		dispatch(actions.getChatRequest())
		const [err, response ] = await to(axios.get(`${AppURL}/reviews/${review_id}/chats`))
		if (err) {
			dispatch(actions.getChatError(err))
		} 
		else {
			console.log(response.data, 'data')
			dispatch(actions.getChatSuccess(response.data))
		}
	}
}

const actions = {
	addChatRequest: () => ({
		type: constants.ADD_CHAT_REQUEST
	}),
	addChatSuccess: comments => ({
		type: constants.ADD_CHAT_SUCCESS,
		payload: comments 
	}),
	addChatError: error => ({
		type: constants.ADD_CHAT_FAILURE,
		payload: { error }
	}),
	getChatRequest: () => ({
		type: constants.GET_CHAT_REQUEST
	}),
	getChatSuccess: chats => ({
		type: constants.GET_CHAT_SUCCESS,
		payload: chats
	}),
	getChatError: error => ({
		type: constants.GET_CHAT_FAILURE,
		payload: { error }
	})
}

export default ChatActions