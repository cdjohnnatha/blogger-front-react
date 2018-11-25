import { updateObject } from '../../shared/utility';

import { AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
  SET_REDIRECT_PATH,
 } from '../actions/actionTypes';

const initialState = {
  tokenType: null,
  accessToken: null,
  uid: null,
  client: null,
  userId: null,
  error: null,
  loading: false,
  redirectPath: '/login'
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
    redirectPath: '/'
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

const setRedirectPath = (state, action) => {
  return updateObject(state, { redirectPath: action.path });
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
    case SET_REDIRECT_PATH:
      return setRedirectPath(state, action);
    default:
      return state;
  }
}

export default reducer;
