const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
const MySQL = require("mysql");
const { dbInfo } = require("./dbInfo");
const { Authenticate } = require("./Authenticator");
const { sessionSecret } = process.env.SESSION_SECRET || require("./secrets");

const pool = MySQL.createPool({ connectionLimit: 4, ...dbInfo });
const sessionStore = new MySQLStore({}, pool);

express()
  .use((req, res, next) => {
    if (process.env.NODE_ENV === "production" && req.headers["x-forwarded-proto"] !== "https") {
      res.redirect(302, `https://${req.hostname}${req.originalUrl}`);
      // Forces connections to be https, over http the session and card IDs can be stolen
    } else {
      next();
    }
  })
  .use(session({
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
    },
    resave: false,
    saveUninitialized: false,
    secret: sessionSecret,
    store: sessionStore,
  }))
  .post("/api/login/:token", (req, res) => {
    Authenticate(req.params.token, (userId) => {
      req.session.userId = userId;
      res.status(201).send();
    });
  })
  .post("/api/createCard/:deck/:front/:back", (req, res) => {
    pool.getConnection((err0, connection) => {
      connection.query(
        "INSERT INTO `cards` (`user`, `deck`, `front`, `back`, `confidence`, `time`) VALUES (?)",
        [
          [
            req.session.userId.substr(0, 255),
            req.params.deck.substr(0, 255),
            req.params.front,
            req.params.back,
            0,
            0,
          ],
        ],
        (err1) => {
          if (err1) res.status(500).send();
          else res.status(201).send();
          connection.release();
        },
      );
    });
  })
  .put("/api/updateCard/:id/:front/:back/:confidence/:time", (req, res) => {
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
  .get("/api/getDecks", (req, res) => {
    pool.getConnection((err0, connection) => {
      connection.query(
        "SELECT DISTINCT `deck` FROM `cards` WHERE `user`=?",
        [req.session.userId.substr(0, 255)],
        (err1, results) => {
          if (err1) res.status(500).send();
          else res.status(200).json({ results });
          connection.release();
        },
      );
    });
  })
  .get("/api/getCards/:deck", (req, res) => {
    pool.getConnection((err0, connection) => {
      connection.query(
        "SELECT `id`, `front`, `back`, `confidence`, `time` FROM `cards` WHERE `user`=? AND `deck`=?",
        [req.session.userId.substr(0, 255), req.params.deck.substr(0, 255)],
        (err1, results) => {
          if (err1) res.status(500).send();
          else res.status(200).json({ results });
          connection.release();
        },
      );
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
