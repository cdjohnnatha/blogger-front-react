import React, { Component } from 'react';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import Footer from '../Footer/Footer';
import { connect } from 'react-redux';
import './Layout.css';

class Layout extends Component {
  render() {
    return (
      <div>
        <Toolbar isAuth={this.props.isAuthenticated} />
          <main className="mb-4">{this.props.children}</main>
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

export default connect(mapStateToProps)(Layout);
