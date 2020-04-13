import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as actions from '../../store/actions/actionIndex';

import Spinner from '../UI/Spinner';


const UserForm = () => {

  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [action, setAction] = useState('Sign in');
  const [isLoading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const onAuth = (data, method) => dispatch(actions.auth(data, method));

  const isAuthenticated = useSelector(state => state.auth.username !== null);

  const submitHandler = e => {
    e.preventDefault();

    if (!username || (password.length < 8)) {
      setError('Please provide username and password of min 8 characters');
    } else {
      setError('');

      const authData = { username, password };
      setLoading(true);
      onAuth(authData, action)
        .catch(error => {
          const errData = error.response.data;
          const responseError = errData.username ? errData.username[0] : errData.detail;
          setError(responseError);
          setLoading(false);
        });
    }
  };

  const actionChangeHandler = () => {
    setAction(prevState => {
      let action = prevState;
      if (prevState === 'Sign up') action = 'Sign in';
      else if (prevState === 'Sign in') action = 'Sign up';
      return action;
    });
  };

  let jsx = (
    <>
      {isAuthenticated && <Redirect to="/" />}
      {error && <p className="error-message">{error}</p> }
      <div className="center-container">
        <form onSubmit={submitHandler} className="form" >
          <input
            className="text-input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="username"
            autoFocus />
          <input
            className="text-input"
            type="password"
            value={password}
            placeholder="password"
            onChange={e => setPassword(e.target.value)} />
          <button>{action}</button>
          <p
            onClick={actionChangeHandler}
            className="signin-switch">
            Go to {action === 'Sign up' ? ' Sign in' : ' Sign up' }
          </p>
        </form>
      </div>
    </>
  );

  if (isLoading) jsx = <Spinner />;

  return jsx;
};

export default UserForm;
