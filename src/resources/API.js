const APP_URL = 'http://localhost:3000'

export default API = {
    login: function(token) {
        return fetch(APP_URL+'/auth/facebook/'+token, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}