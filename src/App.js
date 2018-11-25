import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter, Router } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Auth from './containers/Auth/Auth';
import Signup from './containers/Auth/Signup/Signup';
import Index from './components/Index/Index';
import ArticleList from './components/Articles/ArticlesList/ArticlesList';
import ArticleShow from './components/Articles/ArticleShow';
import ArticleActions from './components/Articles/ArticleActions';
import { connect } from "react-redux";
import { authCheckState } from './store/actions/auth'
// import PublicRoutes from './routes/PublicRoutes';
import history from './history';



class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes =
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/login" component={Auth} />
          <Route path="/sign_up" component={Signup} />
          <Route path="/articles/:id/show" component={ArticleShow} />
          <Route path="/articles/:id/edit" component={ArticleActions} />
          <Route path="/articles/:id/new" component={ArticleActions} />
          <Route path="/articles" component={ArticleList} />
        </Switch>
      </Router>
    if (this.props.isAuthenticated) {
      routes = (
        <Router history={history}>
          <Switch>
              <Route path="/" exact component={Index} />
              <Route path="/articles/:id/show" component={ArticleShow} />
              <Route path="/articles/:id/edit" component={ArticleActions} />
              <Route path="/articles/:id/new" component={ArticleActions} />
              <Route path="/articles" component={ArticleList} />
          </Switch>
        </Router>
      );
    }
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}


const mapStateToProps = state => {
  console.log(state);
  return {
    isAuthenticated: state.auth.client !== null,
  };
};


const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(authCheckState())
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
