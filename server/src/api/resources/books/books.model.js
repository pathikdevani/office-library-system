const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    isbn: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
    },
    description: {
      type: String,
    },
    pageCount: {
      type: Number,
      required: true,
    },
    categories: {
      type: Array,
    },
    authors: {
      type: Array,
      required: true,
    },
    publisher: {
      type: String,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    issueId: {
      type: String,
    },
  },
  { timestamps: true },
);

const Books = mongoose.model('books', schema);
module.exports = Books;
