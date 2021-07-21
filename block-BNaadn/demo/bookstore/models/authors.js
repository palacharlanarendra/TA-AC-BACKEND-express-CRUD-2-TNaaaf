var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema(
  {
    author_name: { type: String, required: true },
    author_email: { type: String, required: true },
    author_country: { type: String, required: true },
    booksId: [{ type: Schema.Types.ObjectId, ref: 'Book' }],
  },
  { timestamps: true }
);

var Author = mongoose.model('Author', authorSchema);

module.exports = Author;
