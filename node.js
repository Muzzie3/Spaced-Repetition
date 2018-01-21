const express = require("express");
const mysql = require("mysql");
const dbURL = require("./databaseURL") || process.env.CLEARDB_DATABASE_URL;

express()
  .post("/api/createDeck/:user/:deck", (req, res) => {
    const connection = mysql.createConnection(dbURL);
    connection.query(
      `insert into decks values (${req.params.user}, ${req.params.deck})`,
      "",
      err => (err ? res.status(500) : res.status(201)),
    );
  })
  .get("/api/:data", (req, res) => res.status(200).json({ testing: req.params.data }))
  .use(express.static("build"))
  .listen(process.env.PORT || 3000);
