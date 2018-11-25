import React, { Component } from "react";
import { connect } from "react-redux";
import { createArticle, updateArticle, showArticle } from "../../store/actions/articles";
import ArticleForm from './ArticleForm'
import { Redirect } from "react-router-dom";

class ArticlesActions extends Component {
  state = {
    controls: {
      isEditing: {
        value: false,
      },
    }
  };

  componentDidMount() {
    if (this.props.match.url.includes('/edit')) {
      this.props.onShow(this.props.match.params.id);
    }
  }

  onSubmitHandler = (title, content) => {
    if (this.props.match.url.includes('/edit')) {
      this.props.onUpdate(
        this.props.match.params.id,
        title,
        content
      );
    }
    else {
      this.props.onCreate(
        title,
        content,
      );
    }
  }


  render() {
    let btnName = 'Save';
    let form = null;
    if(this.props.match.url.includes('/edit')) {
      if (this.props.articleObject.title) {
          btnName = 'Update';
          form = <ArticleForm
          item={this.props.articleObject}
          onSubmitHandler={this.onSubmitHandler}
          btnName={btnName}
          btnColor="success"
          enableUpdate={true}
          history={this.props.history}
          articleId={this.props.match.params.id}
          />
      }
    } else {
      form = <ArticleForm
        item={this.props.articleObject}
        onSubmitHandler={this.onSubmitHandler}
        btnName={btnName}
        btnColor="default"
      />;
    }
    if (this.props.isRedirect) {
      return <Redirect to={this.props.redirectPath} />
    }
    return (
      <div className="container">
        {form}
      </div>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.articles.loading,
    error: state.articles.error,
    isSuccess: state.articles.success,
    articleObject: state.articles,
    isRedirect: state.articles.redirectPath !== '/',
    redirectPath: state.articles.redirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onShow: (id) => dispatch(showArticle(id)),
    onCreate: (title, content) => dispatch(createArticle(title, content)),
    onUpdate: (id, title, content) => dispatch(updateArticle(id, title, content)),
  };
}

export default  connect(mapStatToProps, mapDispatchToProps)(ArticlesActions);
