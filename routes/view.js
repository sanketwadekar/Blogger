const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const {months} = require('../utils/months');
const Article = require("../models/Article");
const Comment = require("../models/Comment");

router.get("/article/:id", (req, res, next) => {
  try{
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.send("<h1>404 Page Not Found</h1>");
  }
  Article.findOne({ _id: req.params.id })
    .populate("comments")
    .then((article) => {
      if (!article) {
        return res.status(404).send("<h1>404 Page Not Found</h1>");
      }
      var date = new Date(article.date);
      res.render("article", {
        title: article.title,
        description: article.description,
        date,
        authorName: article.authorName,
        authorId: article.authorId,
        user: { name: req.user ? req.user.name : "" },
        articleId: req.params.id,
        comments: article.comments,
        months,
        loggedIn: req.user ? true : false,
        styles:['form']
      });
    });
  }catch(err){
    next(err);
  }
});

router.post("/article/:id/comment", async (req, res, next) => {
  try {
  const newComment = new Comment({
    comment: req.body.comment,
    userId: req.user.id,
    userName: req.user.name,
  });
    const savedComment = await newComment.save();
    const blogPost = await Article.findOne({ _id: req.params.id });
    blogPost.comments.push(mongoose.Types.ObjectId(savedComment._id));
    await blogPost.save();
    res.redirect(`/view/article/${req.params.id}`);
    return;
  } catch (err) {
    next(err);
  }
});

router.get("/profile/:id", (req, res, next) => {
  try{
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.send("<h1>404 Page Not Found</h1>");
  }
  Article.find({ authorId: req.params.id })
    .select({ authorId: 0, __v: 0 })
    .then((article) => {
      if (!article.length) {
        return res.status(404).send("<h1>404 Page Not Found</h1>");
      }
      res.render("profile", {
        name: article[0].authorName,
        articles: article,
        loggedIn: req.user ? true : false,
        months
      });
    });
  }catch(err){
    next(err);
  }
});

module.exports = router;
