const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    issuedAt: {
      type: Date,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'books',
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    isReturned: {
      type: Boolean,
      required: true,
    },
    returnedAt: {
      type: Date,
    },
  },
  { timestamps: true },
);

const Issues = mongoose.model('issues', schema);
module.exports = Issues;
