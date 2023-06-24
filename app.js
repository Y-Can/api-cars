const express = require('express')
const { Pool } = require("pg");
const https = require("https");
const fs = require("fs");



const cors = require('cors');  const app = express();
  // Utilisation du middleware CORS
   app.use(cors());
   require("dotenv").config({ path: "./config/.env" });

const options = {
	key: fs.readFileSync("key.pem"),
	cert: fs.readFileSync("cert.pem"),
};
app.use(cors({ origin: ["http://localhost:3001", "http://localhost:3000"] }));

const pool = new Pool({
	user: process.env.DB_USER,
	host: process.env.DB_HOST,
	database: process.env.DB_DATABASE,
	password: process.env.DB_PASSWORD,
	port: process.env.DB_PORT,
});

pool.connect((err) => {
	if (err) {
		console.error("Erreur de connexion à la base de données", err);
	} else {
		console.log("Connexion à la base de données réussie");
	}
});

app.get("/voitures", (req, res) => {
	pool.query("SELECT * FROM all_voitures", (err, result) => {
		if (err) {
			console.error("Erreur lors de la récupération des voitures", err);
			res
				.status(500)
				.json({ error: "Erreur lors de la récupération des voitures" });
		} else {
			res.json(result.rows);
		}
	});
});


app.get('/', (req, res) => res.send('Hell 55666o'))

// app.listen(process.env.PORT, ()=> console.log(`notre APplication démarre sur : http://localhost:${process.env.PORT}`))
https.createServer(options, app).listen(process.env.PORT);