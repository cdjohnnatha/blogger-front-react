import React from 'react';
import Toolbar from '../Toolbar/Toolbar';
import Carousel from '../Carousel/Carousel';
import CardNews from '../CardNews/CardNews';
import Footer from '../Footer/Footer';

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

export default index;