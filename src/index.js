import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';

import 'bootstrap/dist/css/bootstrap.min.css';
import authReducer from "./store/reducers/auth";
import signUpReducer from "./store/reducers/signup";
import articlesReducer from "./store/reducers/articles";
import commentReducer from "./store/reducers/comment";



const rootReducer = combineReducers({
  auth: authReducer,
  signup: signUpReducer,
  articles: articlesReducer,
  comment: commentReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
