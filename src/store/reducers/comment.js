import {
  SUCCESS_STATE,
  SET_FAIL_STATE,
  START_EDIT_COMMENT,
  CANCEL_EDIT_COMMENT,
  SET_RELOAD_LIST,
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  enableCommentEditing: false,
  editingId: null,
  editableContent: '',
  reloadList: false,
  articleId: null,
  error: null,
  success: false,
  redirectPath: '/',
  loading: false
}


const isSuccess = (state, action) => {
  return updateObject(state, { success: action.success, loading: true });
}

const setReloadList = (state, action) => {
  return updateObject(state, { reloadList: action.state, loading: action.loading });
}

const failState = (state, action) => {
  return updateObject(state, { error: action.error });
}

const startEditComment = (state, action) => {
  return updateObject(state, {
    enableCommentEditing: true,
    editingId: action.commentId,
    editableContent: action.editableContent
  })
}

const setCancelEdit = (state = initialState, action) => {
  return updateObject(state, {
    enableCommentEditing: false,
    editingId: null,
    editableContent: '',
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUCCESS_STATE:
      return isSuccess(state, action);
    case SET_FAIL_STATE:
      return failState(state, action);
    case START_EDIT_COMMENT:
      return startEditComment(state, action);
    case CANCEL_EDIT_COMMENT:
      return setCancelEdit(state, action);
    case SET_RELOAD_LIST:
      return setReloadList(state, action);
    default:
      return state;
  }
}

export default reducer;