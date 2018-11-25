import React, { Component } from 'react';
import { connect } from "react-redux";
import { listArticleComments } from '../../store/actions/articles';
import CommentItem from '../Comments/CommentItem/CommentItem';
import { destroyComment } from '../../store/actions/comment';

class Comments extends Component {

  componentDidMount() {
    const articleId = this.props.articleId;
    this.props.onCommentList(articleId);
  }

  onDestroyHandler = commentId => {
    this.props.onDestroyComment(commentId);
  }

  render() {
    let editButtons = null;
    return (
      <div className="d-flex flex-column">
        {this.props.commentList.map((element, i) => {
          if (element.userId === this.props.userId) {
            editButtons = true;
          }
          return <CommentItem
              allowEditComment={editButtons}
              attributes={element.attributes} key={i}
              commentId={element.id}
              btnDestroyAction={this.onDestroyHandler}
            /> }
        ) }
      </div>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.auth.loading,
    commentList: state.articles.comments,
    error: state.auth.error,
    articleObject: state.articles,
    isAuthenticated: state.auth.client ? true : false,
    userId: state.auth.userId ? state.auth.userId : null,
    articleUserId: state.articles.userId,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCommentList: (id) => dispatch(listArticleComments(id)),
    onDestroyComment: (commentId) => dispatch(destroyComment(commentId))
  };
}

export default connect(mapStatToProps, mapDispatchToProps)(Comments);
