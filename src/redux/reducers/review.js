import {
    SET_CURRENT_REVIEW,
} from 'src/redux/constants'

const initialState = {
    currentReview: {
        title: null,
        user: null,
        picture_cover_url: null,
        content_list: [],
        product_price: null,
        product: null,
        comment_list: [],
        like_by_list: [],
        rating: null,
        timeStamp: null
    }
}

export default reviewReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_CURRENT_REVIEW: 
            console.log('payload', action.payload)
            return {
                ...state,
                currentReview: {
                    title: action.payload.title,
                    user: action.payload.user,
                    picture_cover_url: action.payload.picture_cover_url,
                    product_price: action.payload.product_price,
                    rating: action.payload.rating,
                    product: action.payload.product
                }
            }

        default:
            return state
    }
}