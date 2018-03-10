export const GET_FACEBOOK_USER_REQUEST = 'GET_FACEBOOK_USER_REQUEST'
export const GET_FACEBOOK_USER_SUCCESS = 'GET_FACEBOOK_USER_SUCCESS'
export const GET_FACEBOOK_USER_FAILURE = 'GET_FACEBOOK_USER_FAILURE'

const FacebookURL = 'https://graph.facebook.com/v2.11'

export default actions = {
    getUserFromFacebook: (token) => dispatch => {
        dispatch(actions.getUserFromFacebookRequest())
        fetch(`${FacebookURL}/me?access_token=${token}`)
            .then((response) => response.json())
            .then((responseJson) => {
                const user = {
                    clientId: responseJson.id,
                    name: responseJson.name
                }
                console.log(user, 'userssss')
                dispatch(actions.getUserFromFacebookSuccess(user))    
            })
            .catch((error) => {
                console.error(error);
                dispatch(actions.getUserFromFacebookError(error))
            })
    },
    getUserFromFacebookRequest: () => ({
        type: GET_FACEBOOK_USER_REQUEST
    }),
    getUserFromFacebookSuccess: user => ({
        type: GET_FACEBOOK_USER_SUCCESS,
        payload: { user }
    }),
    getUserFromFacebookError: error => ({
        type: GET_FACEBOOK_USER_FAILURE,
        payload: { error }
    }) 
}
