const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/signup", async (req, res) => {
	const { email, password } = req.body;
	// const userExists = User.findOne({ email });
	// if (userExists) {
	// 	console.log("userExists", userExists);
	// 	res.json({ message: "User exists" });
	// 	return;
	// }
	try {
		const user = new User({ email, password });
		console.log(user);
		await user.save(function(err) {
			if (err) {
				return res.status(422).send(err.message);
			}
			const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
			res.send(token);
		});
	} catch (error) {
		console.log("ERROR: ", error);
		res.status(422).send(err.message);
	}
});

router.post("/signin", async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(422).send({ error: "Must provide email and password" });
	}

	const user = await User.findOne({ email });

	if (!user) {
		return res.status(404).send({ error: "Email not found" });
	}

	try {
		await bcrypt.compare(password, user.password);
		const token = jwt.sign({ userId: user._id }, "SECRET_KEY");
		res.send(token);
	} catch (error) {
		console.log(error);
		return res.status(422).send({ error: "Must provide email and password" });
	}
});

module.exports = router;
