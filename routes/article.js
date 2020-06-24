const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const mongoose = require("mongoose");
const Article = require("../models/Article");

mongoose.set("useFindAndModify", false);

router.get("/delete/:articleId", ensureAuthenticated, (req, res) => {
  console.log("sadsda");
  Article.deleteOne({ _id: req.params.articleId })
    .then((result) => {
      res.redirect("/dashboard");
    })
    .catch((err) => console.log(err));
});

router.get("/edit/:articleId", ensureAuthenticated, (req, res) => {
  Article.findOne({ _id: req.params.articleId })
    .then((result) => {
      res.render("new-article", {
        type: "edit",
        result,
        loggedIn: req.user ? true : false,
      });
    })
    .catch((err) => console.log(err));
});

router.post("/edit/:articleId", ensureAuthenticated, async (req, res) => {
  try {
    const doc = await Article.findOneAndUpdate(
      { _id: req.params.articleId },
      { title: req.body.title, description: req.body.description },
      { new: true }
    );
    res.redirect("/dashboard");
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
