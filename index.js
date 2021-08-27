const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");


const routeap = require("./routes/approutes");
const secureRoute = require("./routes/secureRoutes");
const UserModel = require("./modules/model");
const routes = require("./routes/routes");

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/apibase");

// mongoose.set("useCreateIndex", true);

mongoose.connection.on("error", (error) => console.log(error));
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/", routes);

app.use(routeap);

app.use(
	"/userSpec",
	passport.authenticate("jwt", { session: false }),
	secureRoute
);

// Handle errors.
app.use(function (err, req, res, next) {
	res.status(err.status || 500);
	res.json({ error: err });
});

app.listen(port, () => {
	console.log(`app is running on port: ${port}`);
});
