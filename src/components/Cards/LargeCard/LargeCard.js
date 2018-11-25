import React from 'react';
import './LargeCard.css';
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import moment from "moment";

const LargeCard = props => {
  const imagePath = props.imagePath ? props.imagePath : "https://static.wixstatic.com/media/9d5371_1ff3f6110203409b916e7f7895c1cfb9~mv2.jpg";
  const { attributes } = props.item;
  return (
    <Card className={`card__styles d-flex ${props.cardClasses}`}>
      <Link to={`/articles/${props.item.id}/show`}>
        <CardImg src={imagePath} alt="Card image cap" />
        <CardBody className="card__body_style">
          <CardTitle>{attributes.title}</CardTitle>
          <CardText className="text-truncate text-justify">{attributes.content}</CardText>
        </CardBody>
        </Link>
        <CardText className="align-self-end mr-2 mb-1">
          <small className="text-muted">Last updated - {moment(attributes['updated-at']).format("MMMM Do, YYYY")}</small>
        </CardText>
    </Card>
  );
}

export default LargeCard;