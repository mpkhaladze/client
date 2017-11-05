import axios from 'axios'
import { browserHistory } from 'react-router'
import { AUTH_USER, AUTH_ERROR,  UNAUTH_USER, FETCH_USER } from './types.js'

const ROOT_URL = "http://localhost:8000/api/v1"


export function signinUser ({email, password}) {
    const sendData = {
        grant_type: "password",
        client_id: 1,
        client_secret: 'Hcm8ofEYEbczMedOOrSF5DxrqQbO79zJDCeqZEeT',
        username: email,
        password
    }
    return function (dispatch) {
        axios.post(`${ROOT_URL}/oauth/token`, sendData)
            .then(response => {
                dispatch({ type: AUTH_USER })
                localStorage.setItem('token', response.data.access_token)
                browserHistory.push('/features')
            })
            .catch(() => {
                dispatch(authError('Bad login info!'))
            })
    }
}

export function signupUser ({ email, password, name, username, password_confirmation }) {
    return function (dispatch) {
        axios.post(`${ROOT_URL}/users`, {email, name, username, password, password_confirmation})
            .then(response => {
                dispatch({ type: AUTH_USER })
                browserHistory.push('/features')
            })
            .catch(error => dispatch(authError(error.response.data)))
    }
}

export function authError(error) {
	return {
		type: AUTH_ERROR,
		payload: error
	}
} 

export function signoutUser() {
	localStorage.removeItem('token')
	return {
		type: UNAUTH_USER
	}
} 

export function fetchUser () {
    return function (dispatch) {
        axios.get(`${ROOT_URL}/users/me`, {
            headers: { authorization: 'Bearer ' + localStorage.getItem('token')}
        })
        .then(response => {
            return dispatch({
                type: FETCH_USER,
                payload: response.data
            })
        })
    }
}