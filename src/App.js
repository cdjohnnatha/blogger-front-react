import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import Auth from './containers/Auth/Auth';
import Signup from './containers/Auth/Signup/Signup';
import Index from './components/Index/Index';
import ArticleForm from './components/Articles/ArticleForm';
import { connect } from "react-redux";

class App extends Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/login" component={Auth} />
        <Route path="/sign_up" component={Signup} />
        <Route path="/articles" component={ArticleForm} />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/Perfil" component={ArticleForm} />
          <Route path="/articles" component={ArticleForm} />
          <Redirect to="/" />
        </Switch>
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
    isAuthenticated: state.auth.client !== null
  };
};

export default withRouter(connect(mapStateToProps)(App));
