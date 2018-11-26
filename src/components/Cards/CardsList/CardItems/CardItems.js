import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";
import moment from "moment";
import './CardItems.css';

const CardItems = props => {
  const { attributes } = props.item
  const img_data = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22286%22%20height%3D%22180%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20286%20180%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_166eb33ec55%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A14pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_166eb33ec55%22%3E%3Crect%20width%3D%22286%22%20height%3D%22180%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2299.125%22%20y%3D%2296.3%22%3EImage%20cap%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';

  return (
    <li className="d-flex card align-items-center flex-row mt-2 mb-1 ml-2 mr-2 nav-item">
      <Link to={`/articles/${props.item.id}/show`}>

        <img src={img_data} alt="..." className="rounded float-left secondary__image mr-2" />
        <div className="d-flex align-items-start flex-column secondary__news__content justify-content-start">
          <p className="font-weight-bold">{attributes.title}</p>
          <p className="text-truncate text-card-overflow ">{attributes.content}</p>
          <div className="text-secondary align-self-end">
            <small>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {moment(attributes['updated-at']).format("MMMM Do, YYYY")}
            </small>
          </div>
        </div>
      </Link>
    </li>
  )
}

export default CardItems;