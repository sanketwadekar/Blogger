const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const mongoose = require("mongoose");
const Article = require("../models/Article");

router.get("/", ensureAuthenticated, (req, res) =>
  res.render("new-article", {
    type: "new",
    result: {},
    loggedIn: req.user ? true : false,
  })
);

router.post("/", (req, res, next) => {
  const { title, description } = req.body;
  var newArticle = new Article({
    title,
    description,
    authorId: mongoose.Types.ObjectId(req.user.id),
    authorName: req.user.name,
  });
  newArticle.save().then((user) => {
    req.flash("success_msg", "Your article has been  submitted!");
    res.redirect("/dashboard");
  });
});

module.exports = router;
