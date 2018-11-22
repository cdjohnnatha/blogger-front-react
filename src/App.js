import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Auth from './containers/Auth/Auth';
import Signup from './containers/Auth/Signup/Signup';
import Index from './components/Index/Index';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/login" component={Auth} />
        <Route path="/sign_up" component={Signup} />
      </Switch>
    );
  }
}

export default App;
