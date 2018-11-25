import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from "react-redux";
import { indexArticle } from '../../../store/actions/articles';
import LargeCard from '../../Cards/LargeCard/LargeCard'

class ArticlesList extends Component {
  componentDidMount() {
    this.props.onIndex();
  }

  render() {
    let articlesCards = null;
    if (this.props.articlesList.length > 0) {
      articlesCards = this.props.articlesList.map(element => <LargeCard item={element} cardClasses="m-3 w-5 h-5" /> );
    }
    return (
      <div>
        <div className="d-flex justify-content-sm-center flex-wrap">
          {articlesCards}
        </div>
      </div>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    articlesList: state.articles.list
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onIndex: () => dispatch(indexArticle()),
  };
}

export default connect(mapStatToProps, mapDispatchToProps)(ArticlesList);
