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
        <a className="navbar-brand" href="/">
          <FontAwesomeIcon icon={faNewspaper} />
          Newspapper
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <NavigationItems></NavigationItems>
        </div>
        {!props.isAuth
          ?
          <a className="navbar-text" href="/login">
            <FontAwesomeIcon icon={faSignInAlt} />
            Login/Sign-up
          </a>
          :
          <a className="navbar-text" href="/logout/">
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
          </a>
        }
    </nav>
  </header>
);

export default toolbar;
