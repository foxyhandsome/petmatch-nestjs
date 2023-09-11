module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const maid = require("../controllers/maiduser.controller")

  var router = require("express").Router();
  router.post("/create-user", user.create);
  router.post("/create-maid", maid.create);

  app.use("/maid-privacy/api/user", router);
};
