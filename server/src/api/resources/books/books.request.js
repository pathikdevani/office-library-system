
const Books = require('./books.model');

class UsersRequest {
  static getAllBooks() {
    return Books.find({});
  }

  static getBookById(bookId) {
    return Books.findOne({ _id: bookId });
  }

  static insertBook(bookDetail) {
    return Books.create(bookDetail);
  }

  static updateBook(id, bookDetail = {}) {
    return Books.findByIdAndUpdate(id, bookDetail);
  }
}


module.exports = UsersRequest;
