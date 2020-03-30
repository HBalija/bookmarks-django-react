import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/actionIndex';

import Spinner from '../UI/Spinner';

class UserForm extends React.Component {

  state = {
    error: '',
    username: '',
    password: '',
    action: 'Sign in',
    loading: false
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

    if (!this.state.username || (this.state.password.length < 8)) {
      this.setState(() => ({ error: 'Please provide username and password of min 8 characters' }));
    } else {
      this.setState(() => ({ error: '' }));

      const authData = {
        username: this.state.username,
        password: this.state.password
      };

      this.setState(() => ({ loading: true }));
      this.props.onAuth(authData, this.state.action)
        .then(() => {
          this.setState(() => ({ loading: false }));
        })
        .catch(error => {
          const errData = error.response.data;
          const responseError = errData.username ? errData.username[0] : errData.detail;
          this.setState(() => ({ error: responseError, loading: false }));
        });
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

    let jsx = (
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

    if (this.state.loading) jsx = <Spinner />;

    return jsx;
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.username !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (data, method) => dispatch(actions.auth(data, method))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
