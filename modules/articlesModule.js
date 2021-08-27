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
	id: {
		type: Number,
		default: 1,
		auto: true,
		unique: true,
	},
	pubyear: { type: Number, default: 1998, required: true },
});

const articles = mongoose.model("Article", articleSchema);

module.exports = articles;
