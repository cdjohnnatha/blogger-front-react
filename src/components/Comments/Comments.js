import React, { Component } from 'react';
import { connect } from "react-redux";
import { listArticleComments } from '../../store/actions/articles';
import CommentItem from '../Comments/CommentItem/CommentItem';

class Comments extends Component {

  componentDidMount() {
    const articleId = this.props.articleId;
    this.props.onCommentList(articleId);
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
              item={element}
              key={i}
              commentId={element.id}
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
  };
}

export default connect(mapStatToProps, mapDispatchToProps)(Comments);
