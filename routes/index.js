const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const { months } = require("../utils/months");
const Article = require("../models/Article");

// Welcome Page
router.get("/", (req, res) => {
  Article.find({}).then((results) => {
    res.render("index", {
      results,
      styles: ["tile"],
      loggedIn: req.user ? true : false,
      months,
    });
  });
});

// Dashboard
router.get("/dashboard", ensureAuthenticated, (req, res) => {
  Article.find({ authorId: req.user.id }).then((articles) => {
    res.render("dashboard", {
      user: { name: req.user.name },
      articles,
      loggedIn: req.user ? true : false,
    });
  });
});

router.get("/search", (req, res) => {
  let exp = req.query.query;
  Article.find({
    $or: [
      { title: { $regex: exp, $options: "i" } },
      { description: { $regex: exp, $options: "i" } },
      { authorName: { $regex: exp, $options: "i" } },
    ],
  }).then((results) => {
    res.render("results", {
      results,
      styles: ["tile"],
      loggedIn: req.user ? true : false,
      months,
    });
  });
});

module.exports = router;
