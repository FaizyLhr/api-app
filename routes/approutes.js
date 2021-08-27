const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const articleModel = require("../modules/articlesModule");
const usersModel = require("../modules/usersModule");

const app = express();

app.get("/users", async (req, res) => {
	const users = await usersModel.find({});
	// console.log(articles);
	try {
		res.send(users);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.get("/articles", async (req, res) => {
	const articles = await articleModel.find({});
	console.log(articles);

	try {
		res.send(articles);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.post("/adduser", (req, res) => {
	const users = new usersModel(req.body);
	try {
		users.save();
		res.send(users);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.post("/addarticle", (req, res) => {
	const articles = new articleModel(req.body);
	try {
		articles.save();
		res.send(articles);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.put("/edituser/:id", async (req, res) => {
	try {
		let users = await usersModel.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		res.send(users);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.put("/editarticle/:id", async (req, res) => {
	try {
		let article = await articleModel.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
			}
		);
		res.send(article);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.delete("/deluser/:id", async (req, res) => {
	try {
		const user = await usersModel.findByIdAndDelete(req.params.id);

		if (!user) {
			res.status(404).send("Page Not Found");
		}

		res.send(user);
	} catch (e) {
		res.status(500).send(e);
	}
});

app.delete("/delarticle/:id", async (req, res) => {
	try {
		const article = await articleModel.findByIdAndDelete(req.params.id);

		if (!article) {
			res.status(404).send("Page Not Found");
		}

		res.send(article);
	} catch (e) {
		res.status(500).send(e);
	}
});

module.exports = app;
