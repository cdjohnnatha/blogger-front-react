import {
  SUCCESS_STATE,
  SET_FAIL_STATE,
  START_EDIT_COMMENT,
  CANCEL_EDIT_COMMENT
} from "./actionTypes";
import axios from 'axios';
const baseUrl = 'http://localhost:3001'

export const setSuccessState = (success) => {
  return { type: SUCCESS_STATE, success };
}

export const setFailState = (error) => {
  return { type: SET_FAIL_STATE, error };
};

export const startEditComment = (commentId) => {
  return { type: START_EDIT_COMMENT, commentId };
}

export const cancelEditComment = () => {
  return { type: CANCEL_EDIT_COMMENT };
}

export const createComment = (articleId, userId, content) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const commentData = {
      data: {
        "type": "comments",
        "attributes": {
          "content": content
        },
        "relationships": {
          "user": {
            "data": { "type": "users", "id":  auth.userId }
          },
          "article": {
            "data": { "type": "articles", "id": articleId  }
          }
        }
      }
    }
    const url = `${baseUrl}/v1/comments`;
    axios.defaults.headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': auth.tokenType,
      'client': auth.client,
      'uid': auth.uid,
      'access-token': auth.accessToken
    }
    axios.post(url, commentData).then(response => {
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      console.log(error.response.data);
      dispatch(setFailState(error.response.data.error));
    })
  }
}

export const destroyComment = (id) => {
  return dispatch => {
    console.log('destroying');
    const tokenType = localStorage.getItem('tokenType');
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    const url = `${baseUrl}/v1/comments/${id}`;
    let headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': tokenType,
      'client': client,
      'uid': uid,
      'access-token': accessToken
    }
    axios.defaults.headers = headers;
    axios.delete(url).then(response => {
      // dispatch(setRedirectPath('/articles'))
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      console.log(error);
      dispatch(setFailState(error.response.data.error));
    });
  }
}

export const updateComment = (id, articleId, content) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const articleData = {
      data: {
        "type": "comments",
        "id": id,
        "attributes": {
          "content": content
        },
        "relationships": {
          "user": {
            "data": { "type": "users", "id": auth.userId }
          },
          "article": {
            "data": { "type": "articles", "id": articleId  }
          }
        }
      }
    }
    const url = `${baseUrl}/v1/comments/${id}`;
    axios.defaults.headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': auth.tokenType,
      'client': auth.client,
      'uid': auth.uid,
      'access-token': auth.accessToken
    }
    axios.put(url, articleData).then(response => {
      console.log(response);
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      console.log(error);
      dispatch(setFailState(error.response.data.error));
    })
  }
}