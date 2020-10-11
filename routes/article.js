const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth");
const mongoose = require("mongoose");
const Article = require("../models/Article");
const Comment = require("../models/Comment");

mongoose.set("useFindAndModify", false);

router.get(
	"/delete/:articleId",
	ensureAuthenticated,
	async (req, res, next) => {
		try {
			const article = await Article.findById(req.params.articleId);
			if (article.authorId.toString() !== req.user._id.toString()) {
				res.send("<h3>Not Authorized</h3>");
				return;
			}
			const deletedComments = await Comment.deleteMany({_id: {$in: article.comments}})
			await article.remove();
			res.redirect("/dashboard");
		} catch (err) {
			next(err);
		}
	}
);

router.get("/edit/:articleId", ensureAuthenticated, (req, res, next) => {
	Article.findOne({ _id: req.params.articleId })
		.then((result) => {
			res.render("new-article", {
				type: "edit",
				result,
				loggedIn: req.user ? true : false,
			});
		})
		.catch((err) => next(err));
});

router.post("/edit/:articleId", ensureAuthenticated, async (req, res, next) => {
	try {
		const doc = await Article.findOneAndUpdate(
			{ _id: req.params.articleId },
			{ title: req.body.title, description: req.body.description },
			{ new: true }
		);
		res.redirect("/dashboard");
	} catch (err) {
		next(err);
	}
});

module.exports = router;
