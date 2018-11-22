import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel';
import CardNews from '../CardNews/CardNews';


class Index extends Component {
  render() {
    return (
      <div className="container">
        <Carousel />
        <article className="d-flex">
          <CardNews/>
        </article>
      </div>
    );
  }
}

export default Index;
