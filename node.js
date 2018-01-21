const express = require("express");
const mysql = require("mysql");
const { dbInfo } = require("./URLparser");

express()
  .post("/api/createDeck/:user/:deck", (req, res) => {
    const connection = mysql.createConnection(dbInfo);
    connection.query(
      "INSERT INTO `decks` VALUES (?)",
      [[req.params.user, req.params.deck]],
      err => (err ? res.status(500) : res.status(201)),
    );
    connection.end();
  })
  .get("/api/:data", (req, res) => res.status(200).json({ testing: req.params.data }))
  .use(express.static("build"))
  .listen(process.env.PORT || 8080);
