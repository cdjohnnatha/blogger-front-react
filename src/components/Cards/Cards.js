import React, {Component} from 'react'
import './CardNews.css'
import LargeCard from './LargeCard/LargeCard'
import SmallCardList from './CardsList/CardList';
import { connect } from 'react-redux';
import { indexArticle } from '../../store/actions/articles';

class Cards extends Component {
  componentDidMount() {
    this.props.onIndex();
  }

  render() {
    let largeCard = null;
    let smallCards = null;
    if (this.props.articlesList.length > 0) {
      largeCard = <LargeCard item={this.props.articlesList[0]}></LargeCard>;
      smallCards = <SmallCardList articlesList={this.props.articlesList}></SmallCardList>;
    }
    return (
      <div className="d-flex">
        {largeCard}
        {smallCards}
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

export default connect(mapStatToProps, mapDispatchToProps)(Cards);
