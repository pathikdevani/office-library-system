const User = require('./api/resources/users/users.model');
const booksRequest = require('./api/resources/books/books.request');

const { users, books } = require('../package.json');

module.exports = () => {
  if (users) {
    Promise.all(users.map((user) => {
      return User.signup(user)
        .then(() => { })
        .catch(() => { });
    }));
  }

  if (books) {
    Promise.all(books.map((book) => {
      return booksRequest.getBookDetailFromAPI(book.isbn).then((detail) => {
        return booksRequest.insertBook(booksRequest.getDetailMappedDetailFromAPI(book.isbn, detail, book.quantity));
      }).catch(() => {});
    }));
  }
};
