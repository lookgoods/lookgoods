import constants from 'src/redux/constants'

const AppURL = constants.AppURL
const TestURL = constants.TestURL

const ImageActions = {
	uploadImage: (image) => async dispatch => {
		dispatch(actions.uploadImageRequest())
		const formData = new FormData()
		formData.append('file', {uri: image.uri, name: image.fileName, type: image.type})
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
	}
}

const actions = {
	uploadImageRequest: () => ({
		type: constants.UPLOAD_IMAGE_REQUEST
	}),
	uploadImageSuccess: image => ({
		type: constants.UPLOAD_IMAGE_SUCCESS,
		payload: { image }
	}),
	uploadImageError: error => ({
		type: constants.UPLOAD_IMAGE_FAILURE,
		payload: { error }
	})
}

export default ImageActions