import API from '../api';

const deleteById = (options = {}) => {
  const { id } = options;
  return API
    .post(`/apps/delete/${id}`)
    .then(res => res.data);
};

const buildById = (options = {}) => {
  const { id } = options;
  return API
    .post(`/apps/build/${id}`)
    .then(res => res.data);
};

export default { deleteById, buildById };
