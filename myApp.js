require("dotenv").config();
let express = require("express");
let app = express();

// console.log("Hello World!");

app.get("/", (req, res) => {
	// res.send("Hello Express");
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
	if (process.env.MESSAGE_STYLE === "uppercase") {
		res.json({ message: "Hello json".toUpperCase() });
	} else {
		res.json({ message: "Hello json" });
	}
});

app.use("/public", express.static(__dirname + "/public"));

module.exports = app;
