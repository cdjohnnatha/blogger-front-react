import React from 'react'

const navigationItems = props => (
  <div className="collapse navbar-collapse" id="navbarNav">

  {!props.isAuth
    ?
    <ul className="navbar-nav  d-flex">
      <li className="nav-item">
        <a className="nav-link" href="/articles">
            Articles
        </a>
      </li>
    </ul>
    :
    <ul></ul>
  }
  </div>
);

export default navigationItems;
