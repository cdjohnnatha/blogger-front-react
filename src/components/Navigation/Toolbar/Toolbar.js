import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import './Toolbar.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems';

const toolbar = props => (
  <header>
    <nav className="navbar navbar-expand-lg navbar-light bg-light toolbar__navigation">
        <a className="navbar-brand" href="#">
          <FontAwesomeIcon icon={faNewspaper} />
          Newspapper
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <NavigationItems></NavigationItems>
        </div>
        {!props.isAuth
          ?
          <Link className="navbar-text" to="/login/">
            <FontAwesomeIcon icon={faSignInAlt} />
            Login/Sign-up
          </Link>
          :
          <Link className="navbar-text" to="/logout/">
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </Link>
        }
    </nav>
  </header>
);

export default toolbar;
