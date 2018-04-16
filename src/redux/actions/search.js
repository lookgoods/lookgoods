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
			dispatch(actions.searchByTagError(err))
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
	})
}

export default SearchActions