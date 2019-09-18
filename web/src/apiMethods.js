import api from './api';


const apiURL = '';


export const getBooks = () => {
  return api.get(`${apiURL}/books`);
};

export const getBookById = (id) => {
  return api.get(`${apiURL}/books/${id}`);
};

export const createBook = (isbn) => {
  return api.post(`${apiURL}/books`, {
    isbn,
  });
};

export const returnBook = (issueId) => {
  return api.patch(`${apiURL}/issues/${issueId}/return`);
}


export const getIssues = () => {
  return api.get(`${apiURL}/issues`);
};

export const getIssueById = (id) => {
  return api.get(`${apiURL}/issues/${id}`);
};

export const createIssue = (bookId, userId, dueDate) => {
  return api.post(`${apiURL}/issues`, {
    bookId,
    userId,
    dueDate,
  });
};
