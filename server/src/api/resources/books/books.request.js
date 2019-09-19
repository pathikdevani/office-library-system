
const Books = require('./books.model');

class UsersRequest {
  static getAllBooks(callback) {
    Books.aggregate([{
      $lookup: {
        from: 'issues', // collection name in db
        localField: '_id',
        foreignField: 'bookId',
        as: 'issues',
      },
    }, {
      $project:
      {
        _id: 1,
        isbn: 1,
        title: 1,
        quantity: 1,
        subtitle: 1,
        description: 1,
        pageCount: 1,
        categories: 1,
        authors: 1,
        publisher: 1,
        publishedDate: 1,
        issueId: 1,
        issues:
        {
          $filter:
          {
            input: '$issues',
            as: 'issues',
            cond: { $gte: ['$$issues.isReturned', false] },
          },
        },
      },
    }]).exec((err, books) => {
      callback(err, books);
    });
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
