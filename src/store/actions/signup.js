import axios from 'axios';
import { SIGN_UP_FAIL, SET_SIGN_UP_REDIRECT, SUCCESS_STATE } from '../actions/actionTypes';
const https = require('https');
const baseUrl = process.env.REACT_APP_BACKEND_ADDRESS || 'http://localhost:3001'

export const signupFail = (error) => {
  return { type: SIGN_UP_FAIL, error };
}

export const setSuccessState = (success) => {
  return { type: SUCCESS_STATE, success };
}

export const setSignupRedirectPath = (path) => {
  return {
    type: SET_SIGN_UP_REDIRECT,
    path: path
  };
};

export const signup = (name, nickname, email, password, password_confirmation) => {
  return dispatch => {
    const signupData = {
      name,
      nickname,
      email,
      password,
      password_confirmation
    }
    const agent = new https.Agent({ rejectUnauthorized: false });
    axios.defaults.headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json'
    }
    axios.defaults.httpAgent = agent;
    const url = `${baseUrl}/auth`;
    axios.post(url, signupData)
      .then(response => {
        console.log(response);
        dispatch(setSignupRedirectPath('/login'));
        dispatch(setSuccessState(true));
      })
      .catch(error => {
        console.log(error.response.data);
        dispatch(signupFail(error.response.data.errors));
      });
    }
}