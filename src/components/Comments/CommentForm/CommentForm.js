import React, { Component } from 'react'
import { Input, Card, Button, CardBody, CardTitle, Form } from 'reactstrap';
import { updateObject, checkValidity } from "../../../shared/utility";

class CommentForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      controls: {
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
    this.props.onSubmitHandler(this.state.controls.content.value);
    const updatedControls = updateObject(this.state.controls, {
      ['content']: updateObject(this.state.controls['content'], { value: '' })
    });
    this.setState({ controls: updatedControls })
  }

  render() {
    return (
      <Form onSubmit={this.submitHandler}>
        <Card>
          <CardBody className="card__body_style">
            <CardTitle>Leave a comment</CardTitle>
            <Input
              type="textarea"
              placeholder="Content"
              id="content"
              value={this.state.controls.content.value}
              onChange={event => this.inputChangedHandler(event, event.target.id)}
            />
            <Button id="destroyBtn" className="mt-2 pt-2" outline color="info">Comment</Button>
          </CardBody>
        </Card>
      </Form>
    )
  }
}

export default CommentForm;