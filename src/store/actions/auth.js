import { AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_REDIRECT_PATH
} from '../actions/actionTypes';

import axios from 'axios';
const https = require('https');
const baseUrl = process.env.REACT_APP_BACKEND_ADDRESS || 'http://localhost:3001';

export const authStart = () => {
  return { type: AUTH_START }
}

export const authSuccess = (tokenType, accessToken, uid, client, userId) => {
  return { type: AUTH_SUCCESS, tokenType, accessToken, uid, client, userId }
}


export const authFail = (error) => {
  return { type: AUTH_FAIL, error };
};

export const logout = () => {
  localStorage.removeItem('tokenType');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('uid');
  localStorage.removeItem('client');
  localStorage.removeItem('expiry');
  return { type: AUTH_LOGOUT }
}

export const setRedirectPath = (path) => {
  console.log(path);
  return {
    type: SET_REDIRECT_PATH,
    redirectPath: path
  };
};

export const checkAuthTimeout = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  }
}

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authStart());

    const authData = {
      email,
      password,
      returnSecureToken: true
    }
    // const url = `${process.env.API_URL}${process.env.AUTH_PATH}`;
    const url = `${baseUrl}/auth/sign_in`;
    const agent = new https.Agent({ rejectUnauthorized: false });
    axios.defaults.headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
    axios.defaults.httpAgent = agent;

    axios.post(url, authData)
      .then(response => {
        const { uid, client, expiry } = response.headers;
        const { data: {data: { id: userId } } } = response;
        const accessToken = response.headers['access-token'];
        const tokenType = response.headers['token-type']
        localStorage.setItem('tokenType', tokenType);
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('uid', uid);
        localStorage.setItem('client', client);
        localStorage.setItem('expiry', expiry);
        localStorage.setItem('userId', userId);
        dispatch(authSuccess(tokenType, accessToken, uid, client, userId))
        dispatch(checkAuthTimeout(expiry));
        dispatch(setRedirectPath('/'));
      })
      .catch(error => {
        dispatch(authFail(error.response.data.errors));
      })
  }
}

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      dispatch(logout());
    } else {
        const tokenType = localStorage.getItem('tokenType');
        const accessToken = localStorage.getItem('accessToken');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(tokenType, accessToken, uid, client, userId));
    }
  };
};
