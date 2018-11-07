import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import Carousel from './components/Carousel/Carousel';
import CardNews from './components/CardNews/CardNews';


class App extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar />
        <Carousel />
        <article>
          <CardNews/>
        </article>
      </div>
    );
  }
}

export default App;
