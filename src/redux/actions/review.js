import constants from 'src/redux/constants'

const ReviewActions = {
	setCurrentReview: (review) => ({
		type: constants.SET_CURRENT_REVIEW,
		payload: review
	})
}

export default ReviewActions