var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: String,
    pages: Number,
    publication: String,
    cover_img: String,
    category: [String],
    authorId: { type: Schema.Types.ObjectId, ref: 'Author' },
  },
  { timestamps: true }
);

var Book = mongoose.model('Book', bookSchema);

module.exports = Book;
