import { updateObject } from '../../shared/utility';
import { SIGN_UP_FAIL, SET_SIGN_UP_REDIRECT, SUCCESS_STATE } from '../actions/actionTypes';


const initialState = {
  success: false,
  signupRedirectPath: '/sign_up'
}

const signupFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}
const successState = (state, action) => {
  return updateObject(state, {
    success: action.success
  });
}

const setSignupRedirectPath = (state, action) => {
  return updateObject(state, { signupRedirectPath: action.path });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_UP_FAIL:
      return signupFail(state, action);
    case SET_SIGN_UP_REDIRECT:
      return setSignupRedirectPath(state, action);
    case SUCCESS_STATE:
      return successState(state, action);
    default:
      return state;
  }
}

export default reducer;