import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/actionIndex';


class UserForm extends React.Component {

  state = {
    error: '',
    username: '',
    password: '',
    action: 'Sign in',
  }

  usernameChangeHandler = e => {
    const username = e.target.value;
    this.setState(() => ({ username }));
  }

  passwordChangeHandler = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  }

  submitHandler = e => {
    e.preventDefault();

    if (!this.state.username || !this.state.password) {
      this.setState(() => ({ error: 'Please provide username and password' }));
    } else {
      this.setState(() => ({ error: '' }));

      const authData = {
        username: this.state.username,
        password: this.state.password
      };

      if (this.state.action === 'Sign in') {
        this.props.onStartLogin(authData)
          .then(() => {
            this.props.history.push('/');
          }).catch(error => {
            // console.log(error.response.status === 401);
            this.setState(() => ({ error: error.response.data.detail }));
          });
      } else if (this.state.action === 'Sign up') {
        this.props.onStartRegister(authData)
          .then(() => {
            this.props.history.push('/');
          })
          .catch(error => {
            // console.log(error.response.status === 400);
            this.setState(() => ({ error: error.response.data.username[0] }));
          });
      }

    }
  }

  actionChangeHandler = () => {
    this.setState(prevState => {
      let action = prevState.action;
      if (prevState.action === 'Sign up') action = 'Sign in';
      else if (prevState.action === 'Sign in') action = 'Sign up';
      return { action };
    });
  }

  render() {
    return (
      <>
        {this.props.isAuthenticated && <Redirect to="/" />}
        {this.state.error && <p className="error-message">{this.state.error}</p> }
        <div className="center-container">
          <form onSubmit={this.submitHandler} className="form" >
            <input
              className="text-input"
              type="text"
              value={this.state.username}
              onChange={this.usernameChangeHandler}
              placeholder="username"
              autoFocus />
            <input
              className="text-input"
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.passwordChangeHandler} />
            <button>{this.state.action}</button>
            <p
              onClick={this.actionChangeHandler}
              className="signin-switch">
              Go to {this.state.action === 'Sign up' ? ' Sign in' : ' Sign up' }
            </p>
          </form>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.username !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartLogin: data => dispatch(actions.startLogin(data)),
    onStartRegister: data => dispatch(actions.startRegister(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
