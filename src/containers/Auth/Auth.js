import React, { Component } from 'react'
import { Form, FormGroup, Button } from 'reactstrap';
import { auth, setAuthRedirectPath } from '../../store/actions/auth';
import { connect } from "react-redux";

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
        name: '',
        email: ' '
    };
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(this.state.email, this.state.password)
  }

  handleChange = (event) => {
    if (event.target.id === 'password') {
      this.setState({password: event.target.value});
    } else {
      this.setState({email: event.target.value});
    }
  }
  render() {
    return (
      <div className="container">
        <Form className="border rounded" onSubmit={this.submitHandler}>
          <FormGroup>
            <label htmlFor="email">Email address</label>
            <input type="email"
            className="form-control required"
            id="email"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            onChange={e => this.handleChange(e)}
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
              onChange={e => this.handleChange(e)}
              value={this.state.value}
              />
          </FormGroup>
          <Button>Submit</Button>
        </Form>
      </div>
    )
  }
}

const mapStatToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath('/'))
  };
}


export default connect(mapStatToProps, mapDispatchToProps)(Auth);;
