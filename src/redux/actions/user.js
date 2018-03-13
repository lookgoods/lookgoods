import { 
    AppURL,
    FacebookURL,
    GET_FACEBOOK_USER_FAILURE,
    GET_FACEBOOK_USER_REQUEST,
    GET_FACEBOOK_USER_SUCCESS
} from 'src/redux/constants'

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

async function loginWithFacebook(token) {
    let response
    try {
        response = await fetch(`${AppURL}/auth/facebook/token`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache'
            },
            body: JSON.stringify({
                access_token: token,
            })
        })
    }catch(err) {
        console.log(err, 'loginWithFacebook error')
        return err
    }
    console.log(response, 'loginWithFacebook')
    return response
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
    }),
    loginWithFacebook: (token) => async dispatch => {
        loginWithFacebook(token)
    }
}
