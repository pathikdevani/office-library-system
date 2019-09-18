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
    page_count: {
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
    published_date: {
      type: Date,
      required: true,
    },
    issue_id: {
      type: String,
    },
  },
  { timestamps: true },
);

const Books = mongoose.model('books', schema);
module.exports = Books;
