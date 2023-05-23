const express = require("express");
const app = express();
const port = 3009;
const db = require("./database/database");
const { check, validationResult } = require("express-validator");

app.use(express.json());

app.get("/get", async (req, res) => {
	const qasd = await db.promise().query("select * from Login");
	res.sendStatus(200);
	console.log(qasd[0]);
});

app.get("/about", (req, res) => {});

app.post(
	"/post",
	[
		check("password").notEmpty().withMessage("Cannot Enter Empty Password"),
		check("username").notEmpty().withMessage("please Enter a valid Username"),
	],
	(req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.sendStatus(400).json(errors);
		}
		const { username, password } = req.body;
		console.log(username + " " + password);

		if (username && password) {
			try {
				db.promise().query(
					`insert into Login values ('${username}','${password}');`
				);
				res.sendStatus(200).send("created user successfully");
			} catch (err) {
				console.log(err);
			}
		}
	}
);

app.delete("/delete", (req, res) => {
	const { username } = req.body;
	if (username) {
		db.promise().query(`delete from Login where username='${username}'`);
	}
	res.sendStatus(200);
});

app.put("/put", (req, res) => {
	const { username, password } = req.body;
	if (username && password) {
		db.promise().query(
			`update Login set password='${password}' where username='${username}'`
		);
	}
	res.sendStatus(200);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
