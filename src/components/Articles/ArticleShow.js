import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { showArticle, destroyArticle } from '../../store/actions/articles';
import { createComment } from '../../store/actions/comment';
import './Article.css';
import moment from "moment";
import Comment from '../Comments/Comments'
import SetupButtons from '../SetupButtons/SetupButtons';
import { Redirect } from 'react-router-dom';
import { updateObject } from "../../shared/utility";
import CommentForm from '../Comments/CommentForm/CommentForm';
import { listArticleComments } from '../../store/actions/articles';

class ArticleShow extends Component {
  state = {
    controls: {
      redirectUpdate: {
        value: false
      },
      content: {
        value: '',
        valid: false,
        validation: {
          required: true,
        },
      },
    }
  }
  componentDidMount() {
    this.props.onShow(this.props.match.params.id);
  }

  onDestroyClick = () => {
    this.props.onDestroy(this.props.match.params.id);
  }

  onSetUpdate = () => {
    const controlName = 'redirectUpdate';
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: true,
      })
    })

    this.setState({ controls: updatedControls })
  }

  onSubmitHandler = (content) => {
    this.props.onCreateComment(this.props.match.params.id, this.props.userId, content);
  }


  render() {
    let optionButtons = null;
    let newComment = null;
    if (this.props.isAuthenticated && (parseInt(this.props.articleUserId) === parseInt(this.props.userId))) {
      optionButtons = <SetupButtons
        elementId={this.props.match.params.id}
        destroyAction={this.onDestroyClick}
        updateAction={this.onSetUpdate} />
        newComment = (
          <div className="mb-2 card__styles">
            <CommentForm
              onSubmitHandler={this.onSubmitHandler}
              item={this.props.commentObject}
              />
          </div>
        );
    }
    if (this.state.controls.redirectUpdate.value) {
      return <Redirect to={`/articles/${this.props.match.params.id}/edit`} />
    }
    if (this.props.isRedirect) {
      return <Redirect to={this.props.redirectPath} />
    }
    return (
      <div className="d-flex align-items-start ml-2 mb-2">
        <div className="d-flex flex-column " id="articleContentContainer">
          <div>
            <h1 className="ml-5 mt-2">{this.props.articleObject.title}</h1>
            <Row>
              <div className='col-lg-8 col-lg-offset-2'>
                <hr />
              </div>
            </Row>
          </div>
          <div id="dateContent" className="d-flex flex-column align-items-start">
            <small>
              Last update:
            </small>
            <small>
              <FontAwesomeIcon icon={faCalendarAlt} />
              {moment(this.props.articleObject.lastUpdate).format("MMMM Do, YYYY")}
            </small>
          </div>
          <div id="figureContent">
            <img className="mr-4" align="left" src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_166eb966c12%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_166eb966c12%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.4296875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"></img>
            <p>{this.props.articleObject.content}</p>
            {optionButtons}
          </div>
        </div>
        <div className="align-self-center ml-2 mt-3">
          <h4>Comments</h4>
          <div className="comments-overflow">
            {newComment}
            <Comment articleId={this.props.match.params.id}></Comment>
          </div>
        </div>
      </div>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.articles.loading,
    error: state.articles.error,
    articleObject: state.articles,
    articleUserId: state.articles.userId,
    isSuccess: state.comment.success,
    isAuthenticated: state.auth.client ? true : false,
    userId: state.auth.userId ? state.auth.userId : false,
    commentObject: null,
    commentCrated: state.comment.success,
    isRedirect: state.articles.redirectPath !== '/',
    redirectPath: state.articles.redirectPath,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onShow: (id) => dispatch(showArticle(id)),
    onDestroy: (id) => dispatch(destroyArticle(id)),
    onCreateComment: (articleId, userId, content) => dispatch(createComment(articleId, userId, content)),
    onUpdateComments: (articleId) => dispatch(listArticleComments(articleId))
  };
}

export default connect(mapStatToProps, mapDispatchToProps)(ArticleShow);
