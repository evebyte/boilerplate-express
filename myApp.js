// imports express and creates an express app
require("dotenv").config();
let express = require("express");
let app = express();

// add simple logger for all requests
app.use((req, res, next) => {
	console.log(`${req.method} ${req.path} - ${req.ip}`);
	next();
});

// root route sends user index.html
app.get("/", (req, res) => {
	// res.send("Hello Express");
	res.sendFile(__dirname + "/views/index.html");
});

// we can chain a middleware function and the final handler together
// adds the current time to the request object
app.get(
	"/now",
	(req, res, next) => {
		res.json({
			time: new Date().toString(),
		});
		next();
	},
	(req, res) => {
		console.log("/now route");
	}
);

// echos the request word back in json
app.get("/:word/echo", (req, res) => {
	// get the word from the request
	const word = req.params.word;

	res.json({
		echo: req.params.word,
	});
});

// json route sends json data back
app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		res.json({ message: "Hello json".toUpperCase() });
	} else {
		res.json({ message: "Hello json" });
	}
});

// mounts middleware to serve static files
app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
