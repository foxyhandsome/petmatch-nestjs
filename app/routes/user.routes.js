module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const maid = require("../controllers/maiduser.controller");
  const booking = require("../controllers/booking.controller");

  var router = require("express").Router();
  router.post("/create-user", user.create);
  router.post("/create-maid", maid.create);
  router.post("/create-book", booking.create);

  router.post("/get-user/:room_id", user.getUser);

  router.post("/login", user.login);
  router.post("/loginmaid", maid.loginMaid);

  router.delete("/delete/:room_id", user.deleteUser);
  router.delete("/deletemaid/:maid_id", maid.deleteMaid);

  router.put("/edit/:id_user", user.editUser);
  router.put("/editmaid/:maid_id", maid.editMaid);
  router.put("/editbook/:booking_id", maid.editMaid);

  app.use("/maid-privacy/api/user", router);
};
