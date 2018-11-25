import { INDEX_ARTICLE,
  SHOW_ARTICLE,
  SUCCESS_STATE,
  SET_ARTICLE_COMMENTS,
  SET_ARTICLE_LIST,
  ARTICLE_FAIL,
  SET_REDIRECT_PATH,
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  list: [],
  title: null,
  content: null,
  lastUpdate: null,
  userId: null,
  comments: [],
  error: null,
  success: false,
  redirectPath: '/',
  loading: false
}

const index = (state, action) => {
  return updateObject(state, { list: action.articleList });
}

const show = (state, action) => {
  return updateObject(state, {
    title: action.title,
    content: action.content,
    lastUpdate: action.lastUpdate,
    userId: action.userId
  });
}

const isSuccess = (state, action) => {
  return updateObject(state, { success: true, loading: true });
}

const articleComments = (state, action) => {
  return updateObject(state, { comments: action.comments });
}

const failState = (state, action) => {
  return updateObject(state, { error: action.error });
}

const setRedirectPath = (state, action) => {
  return updateObject(state, { redirectPath: action.redirectPath });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INDEX_ARTICLE:
      return index(state, action);
    case SET_ARTICLE_LIST:
      return index(state, action);
    case SUCCESS_STATE:
      return isSuccess(state, action);
    case SHOW_ARTICLE:
      return show(state, action);
    case SET_ARTICLE_COMMENTS:
      return articleComments(state, action);
    case ARTICLE_FAIL:
      return failState(state, action);
    case SET_REDIRECT_PATH:
      return setRedirectPath(state, action)
    default:
      return state;
  }
}

export default reducer;