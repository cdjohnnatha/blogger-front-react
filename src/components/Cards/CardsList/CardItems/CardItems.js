import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'

const CardItems = props => (
  <li className="d-flex card align-items-center flex-row mb-1 nav-item">
    <img src={props.item.img_data} alt="..." className="rounded float-left secondary__image" />
    <div className="d-flex align-items-start flex-column secondary__news__content justify-content-start">
      <div className="font-weight-bold">{props.item.title}</div>
      <div>{props.item.bodyText}</div>
      <div className="text-secondary">
        <FontAwesomeIcon icon={faCalendarAlt} />
        {props.item.date}
      </div>
    </div>
  </li>
)

export default CardItems;