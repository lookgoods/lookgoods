import constants from 'src/redux/constants'
import axios from 'react-native-axios'
import to from 'await-to-js'

const AppURL = constants.AppURL
const TestURL = constants.TestURL

const ImageActions = {
	uploadImage: (image) => async dispatch => {
		console.log(image, 'upload image')
		dispatch(actions.uploadImageRequest())
		const formData = new FormData()
		formData.append('file', {uri: image.uri, name: image.fileName, type: image.type})
		try {
			const response = await fetch(`${TestURL}/uploadImage`, {
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