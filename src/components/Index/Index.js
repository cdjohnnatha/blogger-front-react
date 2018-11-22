import React, { Component } from 'react';
import Carousel from '../Carousel/Carousel';
import Cards from '../Cards/Cards';


class Index extends Component {
  render() {
    return (
      <div className="container">
        <Carousel />
        <article className="d-flex">
          <Cards/>
        </article>
      </div>
    );
  }
}

export default Index;
