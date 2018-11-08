import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Toolbar from './components/Toolbar/Toolbar';
import Carousel from './components/Carousel/Carousel';
import CardNews from './components/CardNews/CardNews';
import Footer from './components/Footer/Footer';
import { BrowserRouter, Route } from 'react-router-dom';


const index = () => {
  return (
    <div className="App">
      <Toolbar />
      <div className="container">
        <Carousel />
        <article className="d-flex">
          <CardNews/>
        </article>
      </div>
      <Footer />
    </div>
  );
}


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={index} />
        {/* <Route path="/login" component={Login} /> */}
      </BrowserRouter>
    );
  }
}

export default App;
