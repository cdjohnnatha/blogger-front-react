import React, { Component } from "react";
import { Form, FormGroup, Button, Row, Col, Label, Input, Alert  } from 'reactstrap';
import { updateObject, checkValidity } from "../../shared/utility";
import { connect } from "react-redux";
import { showArticle, updateArticle, createArticle } from "../../store/actions/articles";

class ArticlesForm extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      controls: {
        title: {
          value: props.item.title ? props.item.title : '',
          valid: false,
          validation: {
            required: true,
          },
        },
        content: {
          value: props.item.content ? props.item.content : '',
          valid: false,
          validation: {
            required: true,
          },
        },
      },
      formIsValid: true,
    };
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
      })
    })

    this.setState({ controls: updatedControls })
  }

  submitHandler = event => {
    event.preventDefault();
    console.log('this.state.controls.title.value');
    this.props.onSubmitHandler(this.state.controls.title.value, this.state.controls.content.value);
  }


  render() {
    return (
      <Form onSubmit={this.submitHandler}>
        <Row>
          <Col md={12}>
            <FormGroup>
            <label htmlFor="title">Title</label>
            <Input
              type="text"
              placeholder="Title"
              autoFocus
              className="text-input"
              id="title"
              value={this.state.controls.title.value}
              onChange={event => this.inputChangedHandler(event, event.target.id)}
            />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <FormGroup>
            <Label for="content">content</Label>
            <Input
              type="textarea"
              placeholder="Content"
              id="content"
              value={this.state.controls.content.value}
              onChange={event => this.inputChangedHandler(event, event.target.id)}
            ></Input>
            </FormGroup>
          </Col>
        </Row>
        <Button disabled={!this.state.formIsValid}>{this.props.btnName}</Button>
      </Form>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.articles.loading,
    error: state.articles.error,
    articleObject: state.articles,
    articleUserId: state.articles.userId,
    isSuccess: state.success,
    isAuthenticated: state.auth.client ? true : false,
    userId: state.auth.userId ? state.auth.userId : false,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onShow: (id) => dispatch(showArticle(id)),
    onUpdate: (id) => dispatch(updateArticle(id)),
    onCreate: (id) => dispatch(createArticle(id)),
  };
}

export default ArticlesForm;
