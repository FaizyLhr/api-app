const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const articleModel = require("../modules/articlesModule");
const usersModel = require("../modules/usersModule");

const router = express.Router();

router.post(
	"/signup",
	passport.authenticate("signup", { session: false }),
	async (req, res, next) => {
		res.json({
			message: "Signup successful",
			user: req.user,
		});
	}
);

router.post("/login", async (req, res, next) => {
	passport.authenticate("login", async (err, user, info) => {
		try {
			if (err || !user) {
				const error = new Error("An error occurred.");

				return next(error);
			}

			req.login(user, { session: false }, async (error) => {
				if (error) return next(error);

				const body = { _id: user._id, email: user.email };
				const token = jwt.sign({ user: body }, "TOP_SECRET");

				// console.log(__dirname);
				// res.sendFile(__dirname + "/static/login.html");
				// res.sendFile("../htmlPages/login.html");
				return res.json({ token });
			});
		} catch (error) {
			return next(error);
		}
	})(req, res, next);
});

router.put(
	"/like",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		articleModel
			.findByIdAndUpdate(
				req.body.articleId,
				{
					// $push: { likes: req.params.id },
					$push: { likes: req.user._id },
				},
				{
					new: true,
				}
			)
			.exec((err, result) => {
				if (err) {
					return res.status(422).json({ error: err });
				} else {
					res.json(result);
				}
			});
	}
);

router.put(
	"/unlike",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		articleModel
			.findByIdAndUpdate(
				req.body.articleId,
				{
					// $pull: { likes: req.params.id },
					$pull: { likes: req.user._id },
				},
				{
					new: true,
				}
			)
			.exec((err, result) => {
				if (err) {
					return res.status(422).json({ error: err });
				} else {
					res.json(result);
				}
			});
	}
);

router.put(
	"/comment",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		const comment = {
			text: req.body.text,
			postedBy: req.user._id,
		};
		Post.findByIdAndUpdate(
			req.body.articleId,
			{
				$push: { comments: comment },
			},
			{
				new: true,
			}
		)
			.populate("comments.postedBy", "_id name")
			.populate("postedBy", "_id name")
			.exec((err, result) => {
				if (err) {
					return res.status(422).json({ error: err });
				} else {
					res.json(result);
				}
			});
	}
);

router.put(
	"/favorite",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		articleModel
			.findByIdAndUpdate(
				req.body.articleId,
				{
					// $push: { likes: req.params.id },
					$push: { likes: req.user._id },
				},
				{
					new: true,
				}
			)
			.exec((err, result) => {
				if (err) {
					return res.status(422).json({ error: err });
				} else {
					res.json(result);
				}
			});
	}
);

router.put(
	"/follow",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		usersModel.findByIdAndUpdate(
			req.body.followId,
			{
				$push: { followers: req.user._id },
			},
			{
				new: true,
			},
			(err, result) => {
				if (err) {
					return res.status(422).json({ error: err });
				}
				articleModel
					.findByIdAndUpdate(
						req.user._id,
						{
							$push: { following: req.body.followId },
						},
						{ new: true }
					)
					.select("-password")
					.then((result) => {
						res.json(result);
					})
					.catch((err) => {
						return res.status(422).json({ error: err });
					});
			}
		);
	}
);

router.put(
	"/unfollow",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		usersModel.findByIdAndUpdate(
			req.body.unfollowId,
			{
				$pull: { followers: req.user._id },
			},
			{
				new: true,
			},
			(err, result) => {
				if (err) {
					return res.status(422).json({ error: err });
				}
				articleModel
					.findByIdAndUpdate(
						req.user._id,
						{
							$pull: { following: req.body.unfollowId },
						},
						{ new: true }
					)
					.select("-password")
					.then((result) => {
						res.json(result);
					})
					.catch((err) => {
						return res.status(422).json({ error: err });
					});
			}
		);
	}
);

module.exports = router;
