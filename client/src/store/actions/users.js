// GET TOKEN

export const getToken = () => {
  return {
    type: 'GET_USER_DATA',
    userToken: localStorage.getItem('access_token'),
    username: localStorage.getItem('username')
  };
};
