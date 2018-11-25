import React, { Component } from 'react'
import { Form, FormGroup, Button } from 'reactstrap';
import { auth, setRedirectPath } from '../../store/actions/auth';
import { connect } from "react-redux";
import { updateObject } from "../../shared/utility";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

class Auth extends Component {
    state = {
      controls: {
        password: {
          value: ''
        },
        email: {
          value: ''
        },
      }
    };

  componentDidMount() {
    if (this.props.redirectPath !== '/') {
      this.props.onSetRedirectPath('/');
    }
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value)
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
      })
    })

    this.setState({ controls: updatedControls })
  }

  render() {
    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }
    console.log(this.props.redirectPath);
    if (this.props.isAthenticated) {
      return <Redirect to='/' />
    }

    return (
      <div className="container">
        {errorMessage}
        <Form className="border rounded" onSubmit={this.submitHandler}>
          <FormGroup>
            <label htmlFor="email">Email address</label>
            <input type="email"
            className="form-control required"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={event => this.inputChangedHandler(event, event.target.id)}
            value={this.state.value}
            />
          </FormGroup>
          <FormGroup>
            <label htmlFor="password">Password</label>
            <input type="password"
              className="form-control required"
              id="password"
              placeholder="Password"
              minLength='8'
              onChange={event => this.inputChangedHandler(event, event.target.id)}
              value={this.state.value}
              />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
        <div>
          <small>Don't have an account ?
            <Link className="navbar-text" to="/sign_up/">
              REGISTER HERE
            </Link>
          </small>
        </div>
      </div>
    )
  }
}

const mapStatToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAthenticated: state.auth.client !== null,
    redirectPath: state.auth.redirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password)),
    onSetRedirectPath: (path) => dispatch(setRedirectPath(path))
  };
}


export default connect(mapStatToProps, mapDispatchToProps)(Auth);;
