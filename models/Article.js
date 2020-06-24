const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  authorName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  comments:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Comment",
  }],
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;
