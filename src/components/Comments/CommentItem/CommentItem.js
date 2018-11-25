import React from "react";
import { Card, CardBody, CardText } from 'reactstrap';
import moment from 'moment';

const CommentItem = props => (
  <Card className='card__styles mb-2 mr-2 d-flex'>
    <CardBody className="card__body_style">
      <CardText>{props.attributes['content']}</CardText>
    </CardBody>
    <CardText className="align-self-end">
      <small className="text-muted">Last updated - {moment(props.attributes['updated-at']).format("MMMM Do, YYYY")}</small>
    </CardText>
  </Card>
);

export default CommentItem;
