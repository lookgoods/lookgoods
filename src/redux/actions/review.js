import {
	SET_CURRENT_REVIEW
} from 'src/redux/constants'

export default {
	setCurrentReview: (review) => ({
		type: SET_CURRENT_REVIEW,
		payload: review
	})
}