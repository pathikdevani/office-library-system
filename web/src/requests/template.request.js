import api from '../api';

const getTemplates = () => api
  .post('/templates/getAll')
  .then(res => res.data);

export default { getTemplates };
