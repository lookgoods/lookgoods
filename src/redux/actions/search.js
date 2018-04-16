import constants from 'src/redux/constants'
import axios from 'axios'
import to from 'await-to-js'
import { Actions } from 'react-native-router-flux'

const AppURL = constants.AppURL

const SearchActions = {
	searchByTitle: (title) => async dispatch => {
		dispatch(actions.searchByTitleRequest())
		try {
			const response = await fetch(`${AppURL}/search/reviews`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ key: title })
			})
			const data = await response.json()
			let transformData = []
			if	(data.length !== 0) {
				data.map((item) => {
					transformData.push(item._id)
				})
			}
			dispatch(actions.searchByTitleSuccess(transformData))
		} catch (err) {
			dispatch(actions.searchByTitleError(err))
		}
	},
	searchByProduct: (product) => async dispatch => {
		dispatch(actions.searchByProductRequest())
		try {
			const response = await fetch(`${AppURL}/search/reviews/products`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ key: product })
			})
			const data = await response.json()
			dispatch(actions.searchByProductSuccess(data))
		} catch (err) {
			dispatch(actions.searchByProductError(err))
		}
	},
	searchByTag: (tag) => async dispatch => {
		dispatch(actions.searchByTagRequest())
		try {
			const response = await fetch(`${AppURL}/search/reviews/tag`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ key: tag })
			})
			const data = await response.json()
			let transformData = []
			if	(data.length !== 0) {
				data.map((item) => {
					transformData.push(item._id)
				})
			}
			dispatch(actions.searchByTagSuccess(transformData, tag))
		} catch (err) {
			dispatch(actions.searchByTagError(err))
		}
	},
	searchByUser: (user) => async dispatch => {
		dispatch(actions.searchByUserRequest())
		try {
			const response = await fetch(`${AppURL}/search/users`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ key: user.toLowerCase() })
			})
			const data = await response.json()
			let transformData = []
			if	(data.length !== 0) {
				data.map((item) => {
					transformData.push(item._id)
				})
			}
			dispatch(actions.searchByUserSuccess(transformData))
		} catch (err) {
			dispatch(actions.searchByUserError(err))
		}
	},
	viewTagReviews: (tag) => async dispatch => {
		await dispatch(SearchActions.searchByTag(tag))
		Actions.viewTagReviewsPage()
	}
}

const actions = {
	searchByTitleRequest: () => ({
		type: constants.SEARCH_BY_TITLE_REQUEST
	}),
	searchByTitleSuccess: (reviews) => ({
		type: constants.SEARCH_BY_TITLE_SUCCESS,
		payload: reviews
	}),
	searchByTitleError: error => ({
		type: constants.SEARCH_BY_TITLE_FAILURE,
		payload: error
	}),
	searchByProductRequest: () => ({
		type: constants.SEARCH_BY_PRODUCT_REQUEST
	}),
	searchByProductSuccess: (product) => ({
		type: constants.SEARCH_BY_PRODUCT_SUCCESS,
		payload: product
	}),
	searchByProductError: error => ({
		type: constants.SEARCH_BY_PRODUCT_FAILURE,
		payload: error
	}),
	searchByTagRequest: () => ({
		type: constants.SEARCH_BY_TAG_REQUEST
	}),
	searchByTagSuccess: (reviews, tag) => ({
		type: constants.SEARCH_BY_TAG_SUCCESS,
		payload: { reviews, tag }
	}),
	searchByTagError: error => ({
		type: constants.SEARCH_BY_TAG_FAILURE,
		payload: error
	}),
	searchByUserRequest: () => ({
		type: constants.SEARCH_BY_USER_REQUEST
	}),
	searchByUserSuccess: (user) => ({
		type: constants.SEARCH_BY_USER_SUCCESS,
		payload: user
	}),
	searchByUserError: error => ({
		type: constants.SEARCH_BY_USER_FAILURE,
		payload: error
	})
}

export default SearchActions