import React from 'react';
import { connect } from 'react-redux';
import { startLogin, startRegister } from '../store/actions/users';


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
      this.setState(() => ({ error: 'Please provide username and password' }));
    } else {
      this.setState(() => ({ error: '' }));

      const authData = {
        username: this.state.username,
        password: this.state.password
      };

      if (this.state.action === 'Sign in') {
        this.props.startLogin(authData)
          .then(() => {
            this.props.history.push('/');
          }).catch(error => {
            // console.log(error.response.status === 401);
            this.setState(() => ({ error: error.response.data.detail }));
          });
      } else if (this.state.action === 'Sign up') {
        this.props.startRegister(authData)
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

const mapDispatchToProps = dispatch => {
  return {
    startLogin: data => dispatch(startLogin(data)),
    startRegister: data => dispatch(startRegister(data))
  };
};

export default connect(null, mapDispatchToProps)(UserForm);
