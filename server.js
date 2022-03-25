const express = require("express");
const mongoose = require("mongoose");
const Article = require("./models/article");
const articleRouter = require("./routes/articles.ejs");
const methodOverride = require("method-override");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

mongoose.connect(process.env.DB_CONNECTION_STRING);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
	const articles = await Article.find().sort({ createdAt: "desc" });
	res.render("articles/index", { articles: articles });
});

app.get("/blog", async (req, res) => {
	const articles = await Article.find().sort({ createdAt: "desc" });
	res.render("articles/blog", { articles: articles });
});

app.get("/thankyou", (req, res) => {
	res.render("articles/thankyou");
});

app.use("/articles", articleRouter);

app.listen(3000, () =>
	console.log("-------- Server Started On Port 3000 --------")
);
