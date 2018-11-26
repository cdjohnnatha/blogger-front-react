import React, { Component } from 'react'
import { Form, FormGroup, Button, Row, Col } from 'reactstrap';
import { signup, setSignupRedirectPath } from '../../../store/actions/signup';
import { connect } from "react-redux";
import { updateObject, checkValidity } from "../../../shared/utility";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

class Signup extends Component {
    state = {
      controls: {
        email: {
          value: '',
          valid: false,
          validation: {
            required: true,
            isEmail: true
          },
        },
        name: {
          value: '',
          valid: false,
          validation: {
            required: true,
          },
        },
        nickname: {
          value: '',
          valid: false,
          validation: {
            required: true,
          },
        },
        password: {
          value: '',
          valid: false,
          validation: {
            required: true,
            minLength: 8
          },
        },
        password_confirmation: {
          value: '',
          valid: false,
          validation: {
            required: true,
            minLength: 8
          },
        }
      },
      formIsValid: true,
    };

  componentDidMount() {
    if (this.props.signupRedirectPath !== '/sign_up') {
      this.props.onSetSignupRedirectPath('/login');
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onSignup(
      this.state.controls.name.value,
      this.state.controls.nickname.value,
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.controls.password_confirmation.value
      );
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

  render() {
    let errorMessage = null;
    let signupRedirect = null;

    if (this.props.error) {
      let errors = this.props.error;
      errorMessage = <ul>{Object.keys(errors).map(key => <li>{ `${key} - ${errors[key].join(', ')}`}</li>)}</ul>
    }
    if (this.props.isSuccess) {
      signupRedirect = <Redirect to={this.props.signupRedirectPath} />
    }

    return (
      <div className="d-flex flex-column align-items-center mt-4">
        {signupRedirect}
        {errorMessage}
        <Form className="border rounded col-sm-4 p-3" onSubmit={this.submitHandler}>
          <Row>
            <Col md={6}>
              <FormGroup>
                <label htmlFor="name">Name</label>
                <input type="name"
                className="form-control"
                id="name"
                aria-describedby="nameHelp"
                placeholder="Enter your name"
                required
                onChange={event => this.inputChangedHandler(event, event.target.id)}
                value={this.state.value}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <label htmlFor="nickname">Nickame</label>
                <input type="string"
                className="form-control"
                id="nickname"
                aria-describedby="nicknameHelp"
                placeholder="Enter your nickname"
                required
                onChange={event => this.inputChangedHandler(event, event.target.id)}
                value={this.state.value}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <FormGroup>
                  <label htmlFor="nickname">Email</label>
                  <input type="email"
                  className="form-control"
                  id="email"
                  aria-describedby="emailHelp"
                  placeholder="Enter your email"
                  required
                  onChange={event => this.inputChangedHandler(event, event.target.id)}
                  value={this.state.value}
                  />
                </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <label htmlFor="password">Password</label>
                <input type="password"
                  className="form-control"
                  required
                  id="password"
                  placeholder="Password"
                  minLength='8'
                  onChange={event => this.inputChangedHandler(event, event.target.id)}
                  value={this.state.value}
                  />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <label htmlFor="password">Password Confirmation</label>
                <input type="password"
                  className="form-control"
                  required
                  id="password_confirmation"
                  placeholder="Password Confirmation"
                  minLength='8'
                  onChange={event => this.inputChangedHandler(event, event.target.id)}
                  value={this.state.value}
                  />
              </FormGroup>
            </Col>
          </Row>
          <Button disabled={!this.state.formIsValid}>Register</Button>
        </Form>
        <div className="mb-3">
          <small>Have already an account ?
            <Link className="navbar-text" to="/login/">
              Login
            </Link>
          </small>
        </div>
      </div>
    )
  }
}

const mapStatToProps = state => {
  return {
    loading: state.signup.loading,
    error: state.signup.error,
    isSuccess: state.signup.success,
    signupRedirectPath: state.signup.signupRedirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onSignup: (name, nickname, email, password, password_confirmation) => dispatch(signup(name, nickname, email, password, password_confirmation)),
    onSetSignupRedirectPath: () => dispatch(setSignupRedirectPath('/login'))
  };
}


export default connect(mapStatToProps, mapDispatchToProps)(Signup);;
