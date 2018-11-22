import React, { Component } from "react";
import { Form, FormGroup, Button, Row, Col, Label, Input, Alert  } from 'reactstrap';
import { updateObject, checkValidity } from "../../shared/utility";
import { connect } from "react-redux";
import { createArticle } from "../../store/actions/articles";

class ArticlesForm extends Component {
  state = {
    controls: {
      title: {
        value: '',
        valid: false,
        validation: {
          required: true,
        },
      },
      content: {
        value: '',
        valid: false,
        validation: {
          required: true,
        },
      },
    },
    formIsValid: true,
  };

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
    this.props.onCreate(
      this.state.controls.title.value,
      this.state.controls.content.value,
    );
  }


  render() {
    let errorMessage = null;
    let singupRedirect = null;
    let alertMessage = null;
    // if (this.props.error) {
    //   let errors = this.props.error;
    //   errorMessage = <ul>{Object.keys(errors).map(key => <li>{ `${key} - ${errors[key].join(', ')}`}</li>)}</ul>
    // }
    if (this.props.isSuccess) {
      alertMessage = (
        <Alert color="success">
          Create article successfully!
        </Alert>
      );
      // console.log(this.props.success);
      // singupRedirect = <Redirect to={this.props.singupRedirectPath} />
    }

    return (
      <div className="container">
        <Form onSubmit={this.submitHandler}>
          { alertMessage }
          {/* {authRedirect} */}
          {/* {errorMessage} */}
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
          <Button disabled={!this.state.formIsValid}>Register</Button>
        </Form>
      </div>
    );
  }
}

const mapStatToProps = state => {
  return {
    loading: state.articles.loading,
    error: state.articles.error,
    isSuccess: state.articles.success,
    // authRedirectPath: state.article.redirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onCreate: (title, content) => dispatch(createArticle(title, content)),
    // onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/login'))
  };
}

export default  connect(mapStatToProps, mapDispatchToProps)(ArticlesForm);
