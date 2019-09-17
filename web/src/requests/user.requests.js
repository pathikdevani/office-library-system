import api from '../api';

const signin = (options = {}) => {
  const { email, password } = options;
  return api
    .post('/users/signin', { email, password })
    .then(res => res.data);
};

const isSingedIn = () => api.get('/users/isSingedIn')
  .then(res => res.data);


const signout = () => api.get('/users/signout');

export default { signin, signout, isSingedIn };
