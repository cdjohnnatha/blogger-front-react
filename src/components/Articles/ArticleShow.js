import React, { Component } from 'react';
import { Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons'
import { connect } from "react-redux";
import { showArticle, } from '../../store/actions/articles';
import './Article.css';
import moment from "moment";
import Comment from '../Comments/Comments'


class ArticleShow extends Component {
  componentDidMount() {
    const articleId = this.props.match.params.id;
    this.props.onShow(articleId);
  }

  render() {
    return (
      <div className="container-fluid d-flex flex-column align-items-start">
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
          <img src="data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22200%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20200%20200%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_166eb966c12%20text%20%7B%20fill%3Argba(255%2C255%2C255%2C.75)%3Bfont-weight%3Anormal%3Bfont-family%3AHelvetica%2C%20monospace%3Bfont-size%3A10pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_166eb966c12%22%3E%3Crect%20width%3D%22200%22%20height%3D%22200%22%20fill%3D%22%23777%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2274.4296875%22%20y%3D%22104.5%22%3E200x200%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E"></img>
        </div>
        <div>
          {this.props.articleObject.content}
        </div>
        <div>
          <h4>Comments</h4>
          <Comment articleId={this.props.match.params.id}></Comment>
        </div>
      </div>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    articleObject: state.articles
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onShow: (id) => dispatch(showArticle(id)),
  };
}

export default connect(mapStatToProps, mapDispatchToProps)(ArticleShow);
