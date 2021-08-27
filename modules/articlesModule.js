const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
	author: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		lowercase: true,
	},
	feild: String,
	likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	comments: [
		{
			text: String,
			postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
		},
	],
	id: {
		type: Number,
		default: 1,
		auto: true,
		unique: true,
	},
	pubyear: { type: Number, default: 1998, required: true },
	followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const articles = mongoose.model("Article", articleSchema);

module.exports = articles;
