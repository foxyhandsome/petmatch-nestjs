module.exports = (app) => {
  const user = require("../controllers/user.controller");

  var router = require("express").Router();
  router.post("/create-user", user.create);

  app.use("/maid-privacy/api/user", router);
};
