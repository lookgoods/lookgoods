import constants from 'src/redux/constants'

const initialState = {
	picture_url: null,
	thumbnail_url: null,
	loading: false,
	error: null,
	showPreviewReview: false,
	showPreviewImage: false,
	previewImage: null,
	previewReview: null
}

export default (state = initialState, action) => {
	switch (action.type) {

	case constants.UPLOAD_IMAGE_SUCCESS: 
		return {
			...state,
			picture_url: action.payload.picture_url,
			thumbnail_url: action.payload.picture_thumbnail_url,
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
			error: action.payload,
			loading: false
		}

	case constants.SHOW_PREVIEW_REVIEW_MODAL: 
		return {
			...state,
			showPreviewReview: true,
			previewReview: action.payload
		}

	case constants.HIDE_PREVIEW_REVIEW_MODAL: 
		return {
			...state,
			showPreviewReview: false,
			previewReview: null
		}

	case constants.SHOW_PREVIEW_IMAGE_MODAL: 
		return {
			...state,
			showPreviewImage: true,
			previewImage: action.payload
		}

	case constants.HIDE_PREVIEW_IMAGE_MODAL: 
		return {
			...state,
			showPreviewImage: false,
			previewImage: null
		}

	default:
		return state
	}
}