import { updateObject } from '../../shared/utility';

import { AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_AUTH_REDIRECT,
 } from '../actions/actionTypes';

const initialState = {
  tokenType: null,
  accessToken: null,
  uid: null,
  client: null,
  userId: null,
  error: null,
  loading: false,
  authRedirectPath: '/'
}

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
}

const authSuccess = (state, action) => {
  return updateObject(state, {
    tokenType: action.tokenType,
    accessToken: action.accessToken,
    uid: action.uid,
    client: action.client,
    userId: action.userId,
    error: null,
    loading: false,
    authRedirectPath: '/'
  });
}

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

const authLogout = (state, action) => {
  return updateObject(state, initialState);
}

const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.path });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state, action);
    case AUTH_SUCCESS:
      return authSuccess(state, action);
    case AUTH_FAIL:
      return authFail(state, action);
    case AUTH_LOGOUT:
      return authLogout(state, action);
    case SET_AUTH_REDIRECT:
      return setAuthRedirectPath(state, action);
    default:
      return state;
  }
}

export default reducer;
