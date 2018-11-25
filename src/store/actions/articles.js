import {
  SHOW_ARTICLE,
  ARTICLE_FAIL,
  SUCCESS_STATE,
  SET_ARTICLE_COMMENTS,
  SET_ARTICLE_LIST,
  SET_ARTICLE_REDIRECT,
} from "../actions/actionTypes";
import axios from 'axios';
const baseUrl = 'http://localhost:3001'

export const articleFail = (error) => {
  return { type: ARTICLE_FAIL, error };
};

export const setSuccessState = (success) => {
  return { type: SUCCESS_STATE, success };
}

export const articleSuccess = (id, title, content, lastUpdate, userId) => {
  return { type: SHOW_ARTICLE, id, title, content, lastUpdate, userId }
}

export const articleComments = (comments) => {
  return { type: SET_ARTICLE_COMMENTS, comments }
}

export const setArticleList = (articleList) => {
  return { type: SET_ARTICLE_LIST, articleList }
}


export const setArticleRedirectPath = (path) => {
  return {
    type: SET_ARTICLE_REDIRECT,
    redirectPath: path
  };
};

export const indexArticle = () => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const url = `${baseUrl}/v1/articles`;
    axios.defaults.headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': auth.tokenType,
      'client': auth.client,
      'uid': auth.uid,
      'access-token': auth.accessToken
    }
    axios.get(url).then(response => {
      const { data: { data: dataList } } = response;
      const list = dataList.map(element => ({
        "id": element.id,
        "attributes": element.attributes,
      }));
      dispatch(setArticleList(list));
    })
    .catch(error => {
      dispatch(articleFail(error.response.data.error));
    })
  }
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

export const destroyArticle = (id) => {
  return dispatch => {
    const tokenType = localStorage.getItem('tokenType');
    const accessToken = localStorage.getItem('accessToken');
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    const url = `${baseUrl}/v1/articles/${id}`;
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
      dispatch(setArticleRedirectPath('/articles'))
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      console.log(error);
      dispatch(articleFail(error.response.data.error));
    });
  }
}

export const updateArticle = (id, title, content) => {
  return (dispatch, getState) => {
    const { auth } = getState();
    const articleData = {
      data: {
        "type": "articles",
        "id": id,
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
    const url = `${baseUrl}/v1/articles/${id}`;
    axios.defaults.headers = {
      'Content-Type': 'application/vnd.api+json',
      'Accept': 'application/vnd.api+json',
      'token-type': auth.tokenType,
      'client': auth.client,
      'uid': auth.uid,
      'access-token': auth.accessToken
    }
    axios.put(url, articleData).then(response => {
      dispatch(setSuccessState(true));
    })
    .catch(error => {
      dispatch(articleFail(error.response.data.error));
    })
  }
}