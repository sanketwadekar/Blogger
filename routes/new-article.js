const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const mongoose = require("mongoose");
const Article = require("../models/Article");

router.get("/", ensureAuthenticated, (req, res, next) => {
	try {
		res.render("new-article", {
			type: "new",
			result: {},
			loggedIn: req.user ? true : false,
		});
	} catch (err) {
		next(err);
	}
});

router.post("/", (req, res, next) => {
	try {
		const { title, description } = req.body;
		var newArticle = new Article({
			title: title,
			description: description,
			authorId: mongoose.Types.ObjectId(req.user.id),
			authorName: req.user.name,
		});
		newArticle.save().then((user) => {
			req.flash("success_msg", "Your article has been submitted!");
			res.redirect("/dashboard");
		});
	} catch (err) {
		next(err);
	}
});

module.exports = router;
