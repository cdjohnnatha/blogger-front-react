import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const navigationItems = props => (
  <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav  d-flex">
      <li className="nav-item">
        <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
      </li>
      <li className="nav-item">
        <a class="nav-link" href="#">Blog</a>
      </li>
    </ul>
  </div>
);

export default navigationItems;
