import api from './api';


const apiURL = 'http://localhost:2021/api';
export const getBooks = () => {
  return api.get(`${apiURL}/books`);
};
