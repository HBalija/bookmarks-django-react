import React from 'react';
import { connect } from 'react-redux';
import { startAuthenticate, onLoadAuthenticate } from '../../store/actions/users';
import { startSetBookmarks, startListLoading } from '../../store/actions/bookmarks';
// import axiosInstance from '../../axios';

class UserForm extends React.Component {

  state = {
    error: '',
    username: '',
    password: '',
    action: 'Sign up',
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

      // submit the form (logic is in add / edit bookmark)

      const authData = {
        username: this.state.username,
        password: this.state.password
      };

      // axiosInstance.post('/api/token/obtain/', authData)
      //   .then(response => {

      //     const data = {
      //       username: authData.username,
      //       isAuthenticated: !!response.data.access,
      //       accessToken: response.data.access,
      //       refreshToken: response.data.refresh,
      //     };

      //     localStorage.setItem('bookmarksData', JSON.stringify(data));

      //     this.props.onLoadAuthenticate(data);

      //   });
      this.props.startAuthenticate(authData);
      this.props.startListLoading();
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
        {this.state.error && <p>{this.state.error}</p> }
        <form onSubmit={this.onSubmit}>
          <input
            type="text"
            value={this.state.username}
            onChange={this.onUsernameChange}
            placeholder="username"
            autoFocus />
          <input
            type="password"
            value={this.state.password}
            placeholder="password"
            onChange={this.onPasswordChange} />

          <button>{this.state.action}</button>
        </form>

        <p>Go to
          <span onClick={this.onActionChange}>
            {this.state.action === 'Sign up' ? ' Sign in' : ' Sign up' }
          </span>
        </p>
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
    startAuthenticate: data => dispatch(startAuthenticate(data)),
    onLoadAuthenticate: data => dispatch(onLoadAuthenticate(data)),
    startSetBookmarks: () => dispatch(startSetBookmarks()),
    startListLoading: () => dispatch(startListLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserForm);
