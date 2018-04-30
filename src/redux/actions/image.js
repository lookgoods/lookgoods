import constants from 'src/redux/constants'

const AppURL = constants.AppURL

const ImageActions = {
	uploadImage: (image) => async dispatch => {
		dispatch(actions.uploadImageRequest())
		const formData = new FormData()
		formData.append('file', { uri: image.uri, name: image.fileName || 'image.jpg', type: image.type || 'image/jpeg' })
		try {
			const response = await fetch(`${AppURL}/uploadImage`, {
				method: 'post',
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				body: formData
			})
			const data = await response.json()
			dispatch(actions.uploadImageSuccess(data))
		} catch (err) {
			dispatch(actions.uploadImageError(err))
		}
	},
	showPreviewImageModal: (image_url) => ({
		type: constants.SHOW_PREVIEW_IMAGE_MODAL,
		payload: image_url
	}),
	hidePreviewImageModal: () => ({
		type: constants.HIDE_PREVIEW_IMAGE_MODAL
	}),
	showPreviewReviewModal: (review) => ({
		type: constants.SHOW_PREVIEW_REVIEW_MODAL,
		payload: review
	}),
	hidePreviewReviewModal: () => ({
		type: constants.HIDE_PREVIEW_REVIEW_MODAL
	})
}

const actions = {
	uploadImageRequest: () => ({
		type: constants.UPLOAD_IMAGE_REQUEST
	}),
	uploadImageSuccess: image => ({
		type: constants.UPLOAD_IMAGE_SUCCESS,
		payload: image
	}),
	uploadImageError: error => ({
		type: constants.UPLOAD_IMAGE_FAILURE,
		payload: error
	})
}

export default ImageActions