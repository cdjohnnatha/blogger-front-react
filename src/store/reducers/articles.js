import { INDEX_ARTICLE,
  UPDATE_ARTICLE,
  DESTROY_ARTICLE,
  SHOW_ARTICLE} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";

const initialState = {
  title: null,
  content: null,
  created_at: null,
  updated_at: null,
  error: null,
  success: false
}




const index = (state, action) => {
  // return updateObject(state, { error: null, loading: true });
}


const show = (state, action) => {
  // return updateObject(state, { error: null, loading: true });
}

const update = (state, action) => {
  // return updateObject(state, { error: null, loading: true });
}

const destroy = (state, action) => {
  // return updateObject(state, { error: null, loading: true });
}


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INDEX_ARTICLE:
      return index(state, action);
    case UPDATE_ARTICLE:
      return update(state, action);
    case DESTROY_ARTICLE:
      return destroy(state, action);
    case SHOW_ARTICLE:
      return show(state, action);
    default:
      return state;
  }
}

export default reducer;