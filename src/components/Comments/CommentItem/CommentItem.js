import React from "react";
import { Card, CardBody, CardText, Button } from 'reactstrap';
import moment from 'moment';

const CommentItem = props => {
  let editingButtons = null;
  console.log(props);
  if (props.allowEditComment) {
    editingButtons = (
      <div>
        <Button className="mr-2 mb-2" outline color="warning">Edit</Button>
        <Button onClick={event => props.btnDestroyAction(props.commentId)}  className="mr-2 mb-2" outline color="danger">Delete</Button>
      </div>
      )
  }
  return (
    <Card className='card__styles mb-2 mr-2 d-flex'>
      <CardBody className="card__body_style">
        <CardText>{props.attributes['content']}</CardText>
        {editingButtons}
      </CardBody>
      <CardText className="d-flex align-self-end">
        <small className="text-muted">
          Last updated - {moment(props.attributes['updated-at']).format("MMMM Do, YYYY")}
        </small>
      </CardText>
    </Card>
  );
}

export default CommentItem;
