const express = require("express");
const mysql = require("mysql");
const { dbInfo } = require("./URLparser");
const { OAuth } = require("./OAuthValidator");

const pool = mysql.createPool({ connectionLimit: 5, ...dbInfo });

express()
  .post("/api/createCard/:user/:deck/:front/:back", (req, res) => {
    OAuth(req.params.user, (user) => {
      pool.getConnection((err0, connection) => {
        connection.query(
          "INSERT INTO `cards` (`user`, `deck`, `front`, `back`, `confidence`, `time`) VALUES (?)",
          [
            [
              user.substr(0, 255),
              req.params.deck.substr(0, 255),
              req.params.front,
              req.params.back,
              0,
              +new Date() / 1000,
            ],
          ],
          (err1) => {
            if (err1) res.status(500).send();
            else res.status(201).send();
            connection.release();
          },
        );
      });
    });
  })
  .patch("/api/updateCard/:id/:front/:back/:confidence/:time", (req, res) => {
    pool.getConnection((err0, connection) => {
      connection.query(
        "UPDATE `cards` SET `front`=?, `back`=?, `confidence`=?, `time`=? WHERE `id`=?",
        [req.params.front, req.params.back, req.params.confidence, req.params.time, req.params.id],
        (err1) => {
          if (err1) res.status(500).send();
          else res.status(200).send();
          connection.release();
        },
      );
    });
  })
  .get("/api/getDecks/:user", (req, res) => {
    OAuth(req.params.user, (user) => {
      pool.getConnection((err0, connection) => {
        connection.query(
          "SELECT DISTINCT `deck` FROM `cards` WHERE `user`=?",
          [user.substr(0, 255)],
          (err1, results) => {
            if (err1) res.status(500).send();
            else res.status(200).json({ results });
            connection.release();
          },
        );
      });
    });
  })
  .get("/api/getCards/:user/:deck", (req, res) => {
    OAuth(req.params.user, (user) => {
      pool.getConnection((err0, connection) => {
        connection.query(
          "SELECT `id`, `front`, `back`, `confidence`, `time` FROM `cards` WHERE `user`=? AND `deck`=?",
          [user.substr(0, 255), req.params.deck.substr(0, 255)],
          (err1, results) => {
            if (err1) res.status(500).send();
            else res.status(200).json({ results });
            connection.release();
          },
        );
      });
    });
  })
  .delete("/api/deleteCard/:id", (req, res) => {
    pool.getConnection((err0, connection) => {
      connection.query("DELETE FROM `cards` WHERE `id`=?", [req.params.id], (err1) => {
        if (err1) res.status(500).send();
        else res.status(200).send();
        connection.release();
      });
    });
  })
  .use(express.static("build"))
  .listen(process.env.PORT || 8080);
