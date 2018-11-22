import { INDEX_ARTICLE,
  CREATE_ARTICLE,
  UPDATE_ARTICLE,
  DESTROY_ARTICLE,
  ARTICLE_GET_SUCCESS,
  ARTICLE_FAIL,
  SUCCESS_STATE,
  SET_ARTICLE_COMMENTS,
} from "../actions/actionTypes";
import { updateObject } from "../../shared/utility";
import axios from 'axios';

const baseUrl = 'http://localhost:3001'

export const articleFail = (error) => {
  return { type: ARTICLE_FAIL, error };
};

export const setSuccessState = (success) => {
  return { type: SUCCESS_STATE, success };
}

export const articleSuccess = (id, title, content, lastUpdate, userId) => {
  return { type: ARTICLE_GET_SUCCESS, id, title, content, lastUpdate, userId }
}

export const articleComments = (comments) => {
  return { type: SET_ARTICLE_COMMENTS, comments }
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
    const url = `${baseUrl}/v1/articles`;
    axios.defaults.headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': auth.tokenType,
      'client': auth.client,
      'uid': auth.uid,
      'access-token': auth.accessToken
    }
    axios.post(url, articleData).then(response => {
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      dispatch(articleFail(error.response.data.error));
    })
  }
}

export const showArticle = (id) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const url = `${baseUrl}/v1/articles/${id}`;
    let headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': null,
      'client': null,
      'uid': null,
      'access-token': null
    }
    if (auth.client) {
      headers['token-type'] = auth.tokenType;
      headers['client'] = auth.client;
      headers['uid'] = auth.uid;
      headers['access-token'] = auth.accessToken;
    }
    axios.defaults.headers = headers;
    axios.get(url).then(response => {
      const { data: {data } } = response;
      const { attributes: article } = data;
      const { relationships: { user: { data: userData } } } = data;
      dispatch(articleSuccess(article.id, article.title, article.content, article['updated-at'], userData.id))
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      dispatch(articleFail(error.response.data.error));
    })
  }
}

export const listArticleComments = (id) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const url = `${baseUrl}/v1/articles/${id}/comments`;
    let headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': null,
      'client': null,
      'uid': null,
      'access-token': null
    }
    if (auth.client) {
      headers['token-type'] = auth.tokenType;
      headers['client'] = auth.client;
      headers['uid'] = auth.uid;
      headers['access-token'] = auth.accessToken;
    }
    axios.defaults.headers = headers;
    axios.get(url).then(response => {
      const { data: { data: dataObj } } = response;
      const comments = dataObj.map(element => ({
        "id": element.id,
        "attributes": element.attributes,
        "userId": element.relationships.user.data.id
      }));
      dispatch(articleComments(comments))
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      dispatch(articleFail(error.response.data.error));
    })
  }
}