import constants from 'src/redux/constants'
import axios from 'react-native-axios'
import to from 'await-to-js'

const AppURL = constants.AppURL
const TestURL = constants.TestURL

const ImageActions = {
	uploadImage: (image) => async dispatch => {
		dispatch(actions.uploadImageRequest)
		const [err, response] = await to(axios.post(`${TestURL}/uploadImage`), { file: image })
		if (err) dispatch(actions.uploadImageError(err))
		else dispatch(actions.uploadImageSuccess(response))
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