import constants from 'src/redux/constants'

export default {
	setCurrentReview: (review) => ({
		type: constants.SET_CURRENT_REVIEW,
		payload: review
	})
}