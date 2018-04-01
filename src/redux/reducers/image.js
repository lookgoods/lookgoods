import constants from 'src/redux/constants'

const initialState = {
	picture_url: null,
	thumbnail_url: null,
	loading: false,
	error: null
}

export default (state = initialState, action) => {
	switch (action.type) {

	case constants.UPLOAD_IMAGE_SUCCESS: 
		return {
			...state,
			picture_url: action.payload.image.picture_url,
			thumbnail_url: action.payload.image.picture_thumbnail_url,
			loading: false,
			error: null
		}

	case constants.UPLOAD_IMAGE_REQUEST: 
		return {
			...state,
			loading: true,
			error: null
		}

	case constants.UPLOAD_IMAGE_FAILURE: 
		return {
			...state,
			error: action.payload.error,
			loading: false
		}

	default:
		return state
	}
}