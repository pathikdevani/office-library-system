
const axios = require('axios');
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

  static getBookDetailFromAPI(isbn) {
    return axios
      .get(`https://www.googleapis.com/books/v1/volumes?fields=items(volumeInfo)&q=isbn:${isbn}`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          const { data } = response;

          if (data.items && data.items.length) {
            return data.items[0].volumeInfo;
          }

          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            status: 404,
            code: 'BOOK_NOT_FOUND',
          });
        }

        return Promise.reject(response);
      });
  }

  static getDetailMappedDetailFromAPI(isbn, googleBookApi, quantity) {
    const {
      title, subtitle, description, pageCount, categories, authors, publishedDate, publisher, imageLinks, previewLink, infoLink,
    } = googleBookApi;

    return {
      isbn,
      title,
      subtitle,
      description,
      pageCount,
      categories,
      authors,
      publisher,
      publishedDate,
      imageLinks,
      previewLink,
      infoLink,
      quantity,
    };
  }
}


module.exports = UsersRequest;
