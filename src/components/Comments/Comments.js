import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { listArticleComments } from '../../store/actions/articles';
import CommentItem from '../Comments/CommentItem/CommentItem';

class Comments extends Component {

  componentDidMount() {
    const articleId = this.props.articleId;
    this.props.onCommentList(articleId);
  }

  render() {
    return (
      <div className="d-flex flex-column">
        {this.props.commentList.map((element, i) => <CommentItem attributes={element.attributes} key={i} />) }
      </div>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.auth.loading,
    commentList: state.articles.comments,
    error: state.auth.error,
    articleObject: state.articles
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCommentList: (id) => dispatch(listArticleComments(id)),
  };
}

export default connect(mapStatToProps, mapDispatchToProps)(Comments);
