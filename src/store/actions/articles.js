import { INDEX_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DESTROY_ARTICLE,
  ARTICLE_FAIL,
  SUCCESS_STATE } from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import axios from 'axios';

export const articleFail = (error) => {
  return { type: ARTICLE_FAIL, error };
};

export const setSuccessState = (success) => {
  return { type: SUCCESS_STATE, success };
}


export const createArticle = (title, content) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const articleData = {
      data: {
        "type": "articles",
        "attributes": {
          "title": title,
          "content": content
        },
        "relationships": {
          "user": {
            "data": { "type": "users", "id": auth.userId }
          }
        }
      }
    }
    const url = 'http://localhost:3001/v1/articles';
    axios.defaults.headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': auth.tokenType,
      'client': auth.client,
      'uid': auth.uid,
      'access-token': auth.accessToken
    }
    axios.post(url, articleData).then(response => {
      console.log(response);
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      dispatch(articleFail(error.response.data.error));
    })
  }
}