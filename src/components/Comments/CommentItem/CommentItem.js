import React, { Component } from "react";
import { Card, CardBody, CardText, Button, Input } from 'reactstrap';
import moment from 'moment';
import { connect } from "react-redux";
import { startEditComment, destroyComment, updateComment, cancelEditComment } from '../../../store/actions/comment';
import { updateObject, checkValidity } from "../../../shared/utility";

class CommentItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      controls: {
        content: {
          value: this.props.item.attributes['content'],
          valid: false,
          validation: {
            required: true,
          },
        },
      },
    };
  }

  editModeHandler = id => {
    this.props.enableEditMode(id, this.props.item.attributes['content']);
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
      })
    })

    this.setState({ controls: updatedControls })
  }

  onDestroyHandler = commentId => {
    this.props.onDestroyComment(commentId);
  }

  updateHandler = () => {
    let content = this.state.controls.content.value;
    if (content !== '' && this.props.item.attributes.content !== content) {
      this.props.onUpdateComment(this.props.item.id, this.props.item.articleId, content);
    }
  }

  render () {
    let editingButtons = null;
    if (this.props.allowEditComment && this.props.isEditEnable === false) {
      editingButtons = (
        <div>
          <Button onClick={ event => this.editModeHandler(this.props.commentId) } className="mr-2 mb-2" outline color="warning">Edit</Button>
          <Button onClick={ event => this.onDestroyHandler(this.props.commentId)}  className="mr-2 mb-2" outline color="danger">Delete</Button>
        </div>
        )
    }

    let cardContent = (
      <CardBody className="card__body_style">
        <CardText>{this.props.item.attributes['content']}</CardText>
        {editingButtons}
      </CardBody>
    )


    if (this.props.isEditEnable && this.props.commentId === this.props.editableId) {
      cardContent = (
        <CardBody className="card__body_style">
          <Input
            type="textarea"
            className="mb-2"
            id="title"
            value={this.state.controls.content.value}
            onChange={event => this.inputChangedHandler(event, 'content')}
          />
          <Button onClick={ event => this.updateHandler()} className="mr-2 mb-2" outline color="success">Update</Button>
          <Button onClick={ event => this.props.onCancelEditComment()} className="mr-2 mb-2" outline color="">Cancel</Button>
        </CardBody>
      )
    }
    return (
      <Card className='card__styles mb-2 mr-2 d-flex'>
        {cardContent}
        <CardText className="d-flex align-self-end">
          <small className="text-muted">
            Last updated - {moment(this.props.item.attributes['updated-at']).format("MMMM Do, YYYY")}
          </small>
        </CardText>
      </Card>
    );
  }
}

const mapStatToProps = state => {
  return {
    isEditEnable: state.comment.enableCommentEditing,
    editableId: state.comment.editingId
  };
}

const mapDispatchToProps = dispatch => {
  return {
    enableEditMode: (id) => dispatch(startEditComment(id)),
    onDestroyComment: (id) => dispatch(destroyComment(id)),
    onUpdateComment: (id, articleId, content) => dispatch(updateComment(id, articleId, content)),
    onCancelEditComment: () => dispatch(cancelEditComment())
  };
}

export default connect(mapStatToProps, mapDispatchToProps)(CommentItem);
