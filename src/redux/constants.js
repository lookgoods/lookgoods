const constants = {
	AppURL: 'http://35.187.248.137:3000',
	TestURL: 'http://localhost:3000',
	FacebookURL: 'https://graph.facebook.com/v2.11',
	LOGIN_FACEBOOK_REQUEST: 'LOGIN_FACEBOOK_REQUEST',
	LOGIN_FACEBOOK_SUCCESS: 'LOGIN_FACEBOOK_SUCCESS',
	LOGIN_FACEBOOK_FAILURE: 'LOGIN_FACEBOOK_FAILURE',
	GET_CURRENT_USER_REQUEST: 'GET_CURRENT_USER_REQUEST',
	GET_CURRENT_USER_SUCCESS: 'GET_CURRENT_USER_SUCCESS',
	GET_CURRENT_USER_FAILURE: 'GET_CURRENT_USER_FAILURE',
	SET_CURRENT_REVIEW: 'SET_CURRENT_REVIEW',
	SET_SELECTED_USER: 'SET_SELECTED_USER',
	CHANGE_USER_DESCRIPTION_REQUEST: 'CHANGE_USER_DESCRIPTION_REQUEST',
	CHANGE_USER_DESCRIPTION_SUCCESS: 'CHANGE_USER_DESCRIPTION_SUCCESS',
	CHANGE_USER_DESCRIPTION_FAILURE: 'CHANGE_USER_DESCRIPTION_FAILURE',
	GET_USER_REQUEST: 'GET_USER_REQUEST',
	GET_USER_SUCCESS: 'GET_USER_SUCCESS',
	GET_USER_FAILURE: 'GET_USER_FAILURE',
	GET_USER_REVIEWS_REQUEST: 'GET_USER_REVIEWS_REQUEST',
	GET_USER_REVIEWS_SUCCESS: 'GET_USER_REVIEWS_SUCCESS',
	GET_USER_REVIEWS_FAILURE: 'GET_USER_REVIEWS_FAILURE',
	FOLLOW_USER_REQUEST: 'FOLLOW_USER_REQUEST',
	FOLLOW_USER_SUCCESS: 'FOLLOW_USER_SUCCESS',
	FOLLOW_USER_FAILURE: 'FOLLOW_USER_FAILURE',
	UNFOLLOW_USER_REQUEST: 'UNFOLLOW_USER_REQUEST',
	UNFOLLOW_USER_SUCCESS: 'UNFOLLOW_USER_SUCCESS',
	UNFOLLOW_USER_FAILURE: 'UNFOLLOW_USER_FAILURE',
	GET_USER_OWN_REVIEWS_REQUEST: 'GET_USER_OWN_REVIEWS_REQUEST',
	GET_USER_OWN_REVIEWS_SUCCESS: 'GET_USER_OWN_REVIEWS_SUCCESS',
	GET_USER_OWN_REVIEWS_FAILURE: 'GET_USER_OWN_REVIEWS_FAILURE',
	GET_USER_SAVE_REVIEWS_REQUEST: 'GET_USER_SAVE_REVIEWS_REQUEST',
	GET_USER_SAVE_REVIEWS_SUCCESS: 'GET_USER_SAVE_REVIEWS_SUCCESS',
	GET_USER_SAVE_REVIEWS_FAILURE: 'GET_USER_SAVE_REVIEWS_FAILURE',
	GET_CURRENTUSER_OWN_REVIEWS_REQUEST: 'GET_CURRENTUSER_OWN_REVIEWS_REQUEST',
	GET_CURRENTUSER_OWN_REVIEWS_SUCCESS: 'GET_CURRENTUSER_OWN_REVIEWS_SUCCESS',
	GET_CURRENTUSER_OWN_REVIEWS_FAILURE: 'GET_CURRENTUSER_OWN_REVIEWS_FAILURE',
	GET_CURRENTUSER_SAVE_REVIEWS_REQUEST: 'GET_CURRENTUSER_SAVE_REVIEWS_REQUEST',
	GET_CURRENTUSER_SAVE_REVIEWS_SUCCESS: 'GET_CURRENTUSER_SAVE_REVIEWS_SUCCESS',
	GET_CURRENTUSERR_SAVE_REVIEWS_FAILURE: 'GET_CURRENTUSERR_SAVE_REVIEWS_FAILURE',
	GET_USER_FOLLOWER_REQUEST: 'GET_USER_FOLLOWER_REQUEST',
	GET_USER_FOLLOWER_SUCCESS: 'GET_USER_FOLLOWER_SUCCESS',
	GET_USER_FOLLOWER_FAILURE: 'GET_USER_FOLLOWER_FAILURE',
	GET_USER_FOLLOWING_REQUEST: 'GET_USER_FOLLOWING_REQUEST',
	GET_USER_FOLLOWING_SUCCESS: 'GET_USER_FOLLOWING_SUCCESS',
	GET_USER_FOLLOWING_FAILURE: 'GET_USER_FOLLOWING_FAILURE',
	GET_CURRENTUSER_FOLLOWER_REQUEST: 'GET_CURRENTUSER_FOLLOWER_REQUEST',
	GET_CURRENTUSER_FOLLOWER_SUCCESS: 'GET_CURRENTUSER_FOLLOWER_SUCCESS',
	GET_CURRENTUSER_FOLLOWER_FAILURE: 'GET_CURRENTUSER_FOLLOWER_FAILURE',
	GET_CURRENTUSER_FOLLOWING_REQUEST: 'GET_CURRENTUSER_FOLLOWING_REQUEST',
	GET_CURRENTUSER_FOLLOWING_SUCCESS: 'GET_CURRENTUSER_FOLLOWING_SUCCESS',
	GET_CURRENTUSER_FOLLOWING_FAILURE: 'GET_CURRENTUSER_FOLLOWING_FAILURE',
	GET_USERS_REQUEST: 'GET_USERS_REQUEST',
	GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
	GET_USERS_FAILURE: 'GET_USERS_FAILURE',
	ADD_REVIEW_REQUEST: 'ADD_REVIEW_REQUEST',
	ADD_REVIEW_SUCCESS: 'ADD_REVIEW_SUCCESS',
	ADD_REVIEW_FAILURE: 'ADD_REVIEW_FAILURE',
	UPLOAD_IMAGE_REQUEST: 'UPLOAD_IMAGE_REQUEST',
	UPLOAD_IMAGE_SUCCESS: 'UPLOAD_IMAGE_SUCCESS',
	UPLOAD_IMAGE_FAILURE: 'UPLOAD_IMAGE_FAILURE',
	GET_REVIEW_REQUEST: 'GET_REVIEW_REQUEST',
	GET_REVIEW_SUCCESS: 'GET_REVIEW_SUCCESS',
	GET_REVIEW_FAILURE: 'GET_REVIEW_FAILURE',
	EDIT_REVIEW_REQUEST: 'EDIT_REVIEW_REQUEST',
	EDIT_REVIEW_SUCCESS: 'EDIT_REVIEW_SUCCESS',
	EDIT_REVIEW_FAILURE: 'EDIT_REVIEW_FAILURE',
	DELETE_REVIEW_REQUEST: 'DELETE_REVIEW_REQUEST',
	DELETE_REVIEW_SUCCESS: 'DELETE_REVIEW_SUCCESS',
	DELETE_REVIEW_FAILURE: 'DELETE_REVIEW_FAILURE',
	SAVE_REVIEW_REQUEST: 'SAVE_REVIEW_REQUEST',
	SAVE_REVIEW_SUCCESS: 'SAVE_REVIEW_SUCCESS',
	SAVE_REVIEW_FAILURE: 'SAVE_REVIEW_FAILURE',
	UNSAVE_REVIEW_REQUEST: 'UNSAVE_REVIEW_REQUEST',
	UNSAVE_REVIEW_SUCCESS: 'UNSAVE_REVIEW_SUCCESS',
	UNSAVE_REVIEW_FAILURE: 'UNSAVE_REVIEW_FAILURE',
	LIKE_REVIEW_REQUEST: 'LIKE_REVIEW_REQUEST',
	LIKE_REVIEW_SUCCESS: 'LIKE_REVIEW_SUCCESS',
	LIKE_REVIEW_FAILURE: 'LIKE_REVIEW_FAILURE',
	UNLIKE_REVIEW_REQUEST: 'UNLIKE_REVIEW_REQUEST',
	UNLIKE_REVIEW_SUCCESS: 'UNLIKE_REVIEW_SUCCESS',
	UNLIKE_REVIEW_FAILURE: 'UNLIKE_REVIEW_FAILURE',
	ADD_COMMENT_REQUEST: 'ADD_COMMENT_REQUEST',
	ADD_COMMENT_SUCCESS: 'ADD_COMMENT_SUCCESS',
	ADD_COMMENT_FAILURE: 'ADD_COMMENT_FAILURE',
	GET_COMMENT_REQUEST: 'GET_COMMENT_REQUEST',
	GET_COMMENT_SUCCESS: 'GET_COMMENT_SUCCESS',
	GET_COMMENT_FAILURE: 'GET_COMMENT_FAILURE',
	EDIT_COMMENT_REQUEST: 'EDIT_COMMENT_REQUEST',
	EDIT_COMMENT_SUCCESS: 'EDIT_COMMENT_SUCCESS',
	EDIT_COMMENT_FAILURE: 'EDIT_COMMENT_FAILURE',
	DELETE_COMMENT_REQUEST: 'DELETE_COMMENT_REQUEST',
	DELETE_COMMENT_SUCCESS: 'DELETE_COMMENT_SUCCESS',
	DELETE_COMMENT_FAILURE: 'DELETE_COMMENT_FAILURE',
	SET_CURRENT_PAGE: 'SET_CURRENT_PAGE',
	SET_EDIT_COMMENT: 'SET_EDIT_COMMENT'
}

export default constants