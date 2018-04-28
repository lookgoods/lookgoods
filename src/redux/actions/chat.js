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
	},
	editChat: (chat, review_id, chat_id) => async dispatch => {
		dispatch(actions.editChatRequest())
		try {
			const response = await fetch(`${AppURL}/reviews/${review_id}/chats/${chat_id}`, {
				method: 'put',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(chat)
			})
			dispatch(actions.editChatSuccess(response))
			dispatch(ChatActions.getChats(review_id))
		} catch (err) {
			dispatch(actions.editChatError(err))
		}
	},
	deleteChat: (review_id, chat_id) => async dispatch => {
		dispatch(actions.deleteChatRequest())
		const [err, response ] = await to(axios.delete(`${AppURL}/reviews/${review_id}/chats/${chat_id}`))
		if (err) dispatch(actions.deleteChatError(err))
		else {
			dispatch(actions.deleteChatSuccess(response))
			dispatch(ChatActions.getChats(review_id))
		}
	},
	setEditChat: (chat_id) => async dispatch => {
		dispatch(actions.setEditChat(chat_id))
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
	}),
	editChatRequest: () => ({
		type: constants.EDIT_CHAT_REQUEST
	}),
	editChatSuccess: chats => ({
		type: constants.EDIT_CHAT_SUCCESS,
		payload: chats
	}),
	editChatError: error => ({
		type: constants.EDIT_CHAT_FAILURE,
		payload: { error }
	}),
	deleteChatRequest: () => ({
		type: constants.DELETE_CHAT_REQUEST
	}),
	deleteChatSuccess: chats => ({
		type: constants.DELETE_CHAT_SUCCESS,
		payload: chats 
	}),
	deleteChatError: error => ({
		type: constants.DELETE_CHAT_FAILURE,
		payload: { error }
	}),
	setEditChat: chat_id => ({
		type: constants.SET_EDIT_CHAT,
		payload: chat_id
	})
}

export default ChatActions