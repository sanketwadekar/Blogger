const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const mongoose = require("mongoose");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const path = require("path");
const favicon = require("serve-favicon");
require("dotenv").config();

const app = express();

// Passport Config
require("./config/passport")(passport);

app.use(express.static(path.join(__dirname, "public")));

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");

// Express body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Express session
app.use(
	session({
		secret: "secret",
		resave: true,
		saveUninitialized: true,
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
	res.locals.success_msg = req.flash("success_msg");
	res.locals.error_msg = req.flash("error_msg");
	res.locals.error = req.flash("error");
	next();
});

// Routes
app.use("/", require("./routes/index.js"));
app.use("/users", require("./routes/users.js"));
app.use("/new-article", require("./routes/new-article.js"));
app.use("/article", require("./routes/article.js"));
app.use("/view", require("./routes/view.js"));
app.use((err, req, res, next) => {
    console.log(err);
    res.send('<h3>Something went wrong...</h3>');
})
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose
	.connect(process.env.MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("MongoDB Connected");

		app.listen(PORT, console.log(`Server started on http://localhost:${PORT}`));
	})
	.catch((err) => console.log(err));
