import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper } from '@fortawesome/free-solid-svg-icons'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import './Toolbar.css';

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
        <ul className="navbar-nav  d-flex">
          <li className="nav-item">
            <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
          </li>
          <li className="nav-item">
            <a class="nav-link" href="#">Blog</a>
          </li>
        </ul>
      </div>
      <a className="navbar-text" href="#">
        <FontAwesomeIcon icon={faSignInAlt} />
        Login
      </a>
    </nav>
  </header>
);

export default toolbar;
