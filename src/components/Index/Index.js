import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Carousel from '../Carousel/Carousel';
import CardNews from '../CardNews/CardNews';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';


class Index extends Component {
  render() {
    return (
      <div className="App">
        <Toolbar isAuth={this.props.isAuthenticated} />
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
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.client !== null
  }
}

export default connect(mapStateToProps)(Index);
