import React, { Component } from 'react'
import { Form, FormGroup, Button } from 'reactstrap';
import { auth, setAuthRedirectPath } from '../../store/actions/auth';
import { connect } from "react-redux";
import { updateObject } from "../../shared/utility";
import { Redirect } from 'react-router-dom';
import { Link } from "react-router-dom";

class signup extends Component {
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
    if (this.props.authRedirectPath !== '/login') {
      this.props.onSetAuthRedirectPath();
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
    let authRedirect = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>
    }
    if (this.props.isAthenticated) {
      authRedirect = <Redirect to={this.props.authRedirectPath} />
    }

    return (
      <div className="container">
        {authRedirect}
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
            <Link className="navbar-text" to="/login/">
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
    authRedirectPath: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  };
}


export default connect(mapStatToProps, mapDispatchToProps)(signup);;
