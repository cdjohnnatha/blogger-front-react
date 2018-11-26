import React, { Component } from "react";
import { Form, FormGroup, Button, Row, Col, Label, Input  } from 'reactstrap';
import { updateObject, checkValidity } from "../../shared/utility";

class ArticlesForm extends Component {
  constructor(props) {
    super(props);
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
    this.props.onSubmitHandler(this.state.controls.title.value, this.state.controls.content.value);
  }


  render() {
    let cancelEditBtn = null;
    if (this.props.enableUpdate) {
      cancelEditBtn = <Button onClick={() => this.props.history.goBack()} outline color="default" className="ml-2">Cancel</Button>
    }
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
        <Button color={this.props.btnColor} disabled={!this.state.formIsValid}>{this.props.btnName}</Button>
        {cancelEditBtn}
      </Form>
    );
  }
}


export default ArticlesForm;
