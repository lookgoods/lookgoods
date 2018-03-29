import constants from 'src/redux/constants'
import axios from 'react-native-axios'
import to from 'await-to-js'

const AppURL = constants.AppURL

function changeImageValue(content_list) {
	const contentList = []
	content_list.forEach((content) => {
		if (content.type === 'picture') {
			contentList.push({
				type: 'picture',
				value: content.value.data
			})
		} else {
			contentList.push({
				type: 'text',
				value: content.value
			})
		}
	})
	return contentList
}

const ReviewActions = {
	setCurrentReview: (review) => ({
		type: constants.SET_CURRENT_REVIEW,
		payload: review
	}),
	addReview: (review) => async dispatch => {
		const data = {
			title: review.title,
			brand: review.brand,
			name: review.name,
			price: review.price,
			rating: review.rating,
			tag: review.tag,
			picture_cover: review.picture_cover.data,
			content_list: changeImageValue(review.content_list)
		}
		console.log(data, 'review')
		const [ err, response ] = await to(axios.post(`${constants.TestURL}/reviews`), data, {
			header: {
				'Content-Type': 'multipart/form-data'
			}
		})
		if (err) console.log(err)
		else console.log(response)
	}
}

const actions = {
	addReviewRequest: () => ({
		type: constants.ADD_REVIEW_REQUEST
	}),
	addReviewSuccess: response => ({
		type: constants.ADD_REVIEW_SUCCESS,
		payload: { response }
	}),
	addReviewError: error => ({
		type: constants.ADD_REVIEW_FAILURE,
		payload: { error }
	})
}

export default ReviewActions