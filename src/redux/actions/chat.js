import constants from 'src/redux/constants'
import axios from 'axios'
import to from 'await-to-js'

const AppURL = constants.AppURL

const ChatActions = {
	addChat: (chat, review_id) => async dispatch => {
		console.log(chat, review_id, 'eiei')
		dispatch(actions.addChatRequest())
		try {
			const response = await fetch(`${AppURL}/reviews/${review_id}/chats`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(chat)
			})
			const data = await response.json()
			dispatch(actions.addChatSuccess(data))
			dispatch(ChatActions.getChats(review_id))
		} catch (err) {
			dispatch(actions.addChatError(err))
		}
	},
	getChats: (review_id) => async dispatch => {
		dispatch(actions.getChatRequest())
		const [err, response ] = await to(axios.get(`${AppURL}/reviews/${review_id}/chats`))
		if (err) {
			dispatch(actions.getChatError(err))
		} 
		else {
			dispatch(actions.getChatSuccess(response.data))
		}
	}
}

const actions = {
	addChatRequest: () => ({
		type: constants.ADD_CHAT_REQUEST
	}),
	addChatSuccess: chats => ({
		type: constants.ADD_CHAT_SUCCESS,
		payload: chats 
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