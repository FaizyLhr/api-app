const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 5,
		lowercase: true,
	},
	age: { type: Number, default: 1, max: 100, required: true },
	sex: String,
	id: {
		type: Number,
		auto: true,
		unique: true,
	},
	interest: String,
	followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	// favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	// following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

userSchema.methods.follow = function (id) {
	if (this.following.indexOf(id) === -1) {
		this.following.push(id);
	}

	return this.save();
};

const users = mongoose.model("User", userSchema);

module.exports = users;
