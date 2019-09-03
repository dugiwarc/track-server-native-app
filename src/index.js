require("./models/User");
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json({ extended: false }));
app.use(authRoutes);

const mongoURI =
	"mongodb+srv://dugiwarc:069249335@cluster0-brxmm.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(mongoURI, {
	useNewUrlParser: true,
	useCreateIndex: true
});

mongoose.connection.on("connected", () => {
	console.log("Connected to mongo instance");
});
mongoose.connection.on("error", error => {
	console.log("Error connecting to mongo", error);
});

app.get("/", (req, res) => {
	res.send("Hi there!");
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
