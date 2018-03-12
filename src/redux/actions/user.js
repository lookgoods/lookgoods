export const GET_FACEBOOK_USER_REQUEST = 'GET_FACEBOOK_USER_REQUEST'
export const GET_FACEBOOK_USER_SUCCESS = 'GET_FACEBOOK_USER_SUCCESS'
export const GET_FACEBOOK_USER_FAILURE = 'GET_FACEBOOK_USER_FAILURE'

const FacebookURL = 'https://graph.facebook.com/v2.11'

async function fetchUserInfo(token) {
    let response, data
    try {
        response = await fetch(`${FacebookURL}/me?access_token=${token}`)
        data = await response.json()
    }catch(err) {
        console.log(err, 'fetchUserInfo error')
        return err
    }
    return data
}

async function fetchProfilePicture(clientId) {
    let response, data
    try {
        response = await fetch(`${FacebookURL}/${clientId}/picture?width=1200&redirect=false`)
        data = await response.json()
    }catch(err) {
        console.log(err, 'fetchProfilePicture error')
        return err
    }
    return data.data.url
}

export default actions = {
    getUserFromFacebook: (token) => async dispatch => {
        dispatch(actions.getUserFromFacebookRequest())
        try {
            const user = await fetchUserInfo(token)
            const picture_url = await fetchProfilePicture(user.clientId)
            const result = {
                clientId: user.id,
                name: user.name,
                picture_profile: picture_url
            }
            dispatch(actions.getUserFromFacebookSuccess(result))    
        } catch(error) {
            dispatch(actions.getUserFromFacebookError(error))
        }
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
