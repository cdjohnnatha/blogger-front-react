import React from 'react';
import './LargeCard.css';
import { Link } from "react-router-dom";

const LargeCard = props => {
  return (
    <Link to={`/articles/${props.item.id}`}>
      <div className="card card__styles">
        <img className="card-img-top" src="https://static.wixstatic.com/media/9d5371_1ff3f6110203409b916e7f7895c1cfb9~mv2.jpg" alt="Card image cap" />
        <div className="card-body card__body_style">
          <p className="card-text">{props.item.attributes.content}</p>
        </div>
      </div>
    </Link>
  );
}

export default LargeCard;