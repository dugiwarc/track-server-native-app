require("./models/User");
require("./models/Track");

const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes");
const requireAuth = require("./middlewares/requireAuth");

const app = express();
app.use(express.json({ extended: false }));
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI =
	// "mongodb+srv://dugiwarc:069249335@cluster0-brxmm.mongodb.net/test?retryWrites=true&w=majority";
	"mongodb://localhost:27017/tusk_world";

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

app.get("/", requireAuth, (req, res) => {
	res.send(`Your email: ${req.user.email}`);
});

app.listen(3000, () => {
	console.log("Listening on port 3000");
});
