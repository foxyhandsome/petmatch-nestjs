module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const booking = require("../controllers/booking.controller");

  var router = require("express").Router();

  router.post("/create-user", user.create);
  router.post("/create-book", booking.create);

  // router.post("/get-user/:username", user.getUser);



  router.delete("/delete/:username", user.deleteUser);

  router.put("/edit/:username", user.editUser);
  router.put("/editbook/:booking_id", booking.editMaid);

  app.use("/maid-privacy/api/user", router);
};
