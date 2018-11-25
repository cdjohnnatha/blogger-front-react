import React, { Component } from 'react';
import { connect } from "react-redux";
import { listArticleComments } from '../../store/actions/articles';
import { setReloadList } from '../../store/actions/comment';
import CommentItem from '../Comments/CommentItem/CommentItem';

class Comments extends Component {

  componentDidMount() {
    this.props.onCommentList(this.props.articleId);
  }

  componentDidUpdate() {
    if (this.props.isReloadCommentList) {
      this.props.onCommentList(this.props.articleId);
      this.props.onReloadComments(false, false);
    }
  }

  render() {
    let editButtons = null;
    let commentList = null;
    if (this.props.commentList.length > 0) {
      commentList = (
        this.props.commentList.map((element, i) => {
          if (element.userId === this.props.userId) {
            editButtons = true;
          }
          return <CommentItem
              allowEditComment={editButtons}
              item={element}
              key={i}
              commentId={element.id}
            /> }
        )
      )
    }

    return (
      <div className="d-flex flex-column">
        {commentList}
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
    isSuccess: state.comment.success,
    isReloadCommentList: state.comment.reloadList
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCommentList: (id) => dispatch(listArticleComments(id)),
    onReloadComments: (state, loading) => dispatch(setReloadList(state, loading))
  };
}

export default connect(mapStatToProps, mapDispatchToProps)(Comments);
