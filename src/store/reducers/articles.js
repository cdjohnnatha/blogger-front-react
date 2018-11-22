import { INDEX_ARTICLE,
  UPDATE_ARTICLE,
  DESTROY_ARTICLE,
  ARTICLE_GET_SUCCESS,
  SET_ARTICLE_COMMENTS,
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  title: null,
  content: null,
  lastUpdate: null,
  userId: null,
  comments: [],
  error: null,
  success: false
}

const index = (state, action) => {
  // return updateObject(state, { error: null, loading: true });
}


const show = (state, action) => {
  return updateObject(state, {
    title: action.title,
    content: action.content,
    lastUpdate: action.lastUpdate,
    userId: action.userId
  });
}

const update = (state, action) => {
  // return updateObject(state, { error: null, loading: true });
}

const destroy = (state, action) => {
  // return updateObject(state, { error: null, loading: true });
}

const articleComments = (state, action) => {
  return updateObject(state, { comments: action.comments });
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INDEX_ARTICLE:
      return index(state, action);
    case UPDATE_ARTICLE:
      return update(state, action);
    case DESTROY_ARTICLE:
      return destroy(state, action);
    case ARTICLE_GET_SUCCESS:
      return show(state, action);
    case SET_ARTICLE_COMMENTS:
      return articleComments(state, action);
    default:
      return state;
  }
}

export default reducer;