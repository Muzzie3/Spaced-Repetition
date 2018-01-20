const express = require("express");

express()
  .get("/api/:test", (req, res) => res.status(200).json({ testing: req.params.test }))
  .use(express.static("build"))
  .listen(process.env.PORT || 3000);
