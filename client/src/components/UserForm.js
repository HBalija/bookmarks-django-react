import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startRegister } from '../store/actions/users';
import { startSetBookmarks } from '../store/actions/bookmarks';
// import axiosInstance from '../../axios';

class UserForm extends React.Component {

  state = {
    error: '',
    username: '',
    password: '',
    action: 'Sign in',
  }

  onUsernameChange = e => {
    const username = e.target.value;
    this.setState(() => ({ username }));
  }

  onPasswordChange = e => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  }

  onSubmit = e => {
    e.preventDefault();

    if (!this.state.username || !this.state.password) {
      this.setState(() => ({ error: 'Please provide username and password.' }));
    } else {
      this.setState(() => ({ error: '' }));

      const authData = {
        username: this.state.username,
        password: this.state.password
      };

      if (this.state.action === 'Sign in') {
        this.props.startLogin(authData);
      } else if (this.state.action === 'Sign up') {
        this.props.startRegister(authData);
      }
      this.props.history.push('/');

    }
  }
  onActionChange = () => {
    this.setState(prevState => {
      let action = prevState.action;
      if (prevState.action === 'Sign up') action = 'Sign in';
      else if (prevState.action === 'Sign in') action = 'Sign up';
      return { action };
    });
  }

  render() {

    return (
      <div>
        {this.state.error && <p className="error-message">{this.state.error}</p> }
        <div className="center-container">
          <form onSubmit={this.onSubmit} className="form" >
            <input
              className="text-input"
              type="text"
              value={this.state.username}
              onChange={this.onUsernameChange}
              placeholder="username"
              autoFocus />
            <input
              className="text-input"
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.onPasswordChange} />

            <button>{this.state.action}</button>
            <p
              onClick={this.onActionChange}
              className="signin-switch">
              Go to {this.state.action === 'Sign up' ? ' Sign in' : ' Sign up' }
            </p>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    startLogin: data => dispatch(startLogin(data)),
    startSetBookmarks: () => dispatch(startSetBookmarks()),
    startRegister: data => dispatch(startRegister(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
