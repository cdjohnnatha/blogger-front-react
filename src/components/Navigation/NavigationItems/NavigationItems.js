import React from 'react'
import { Link } from "react-router-dom";

const navigationItems = props => (
  <div className="collapse navbar-collapse" id="navbarNav">

  {!props.isAuth
    ?
    <ul className="navbar-nav  d-flex">
      <li className="nav-item">
        <Link className="nav-link" to="/articles">
            Articles
        </Link>
      </li>
    </ul>
    :
    <ul></ul>
  }
  </div>
);

export default navigationItems;
