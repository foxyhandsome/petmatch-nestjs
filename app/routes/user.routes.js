module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const booking = require("../controllers/booking.controller");
  const feed = require("../controllers/feedback.controller")

  var router = require("express").Router();

  router.post("/create-user", user.create);
  router.post("/create-book", booking.create);
  router.post("/create-feed", feed.create);

  
  router.get("/findallusers",user.findAllusers);


  router.delete("/delete/:username", user.deleteUser);
  router.delete("/delete/:booking_id", booking.deleteBook);
  router.delete("/delete/:feedback_id", feed.deleteFeed);

  router.put("/edit/:username", user.editUser);
  router.put("/editbook/:booking_id", booking.editBook);
  router.put("/editfeed/:feedback_id", feed.editFeed);

  app.use("/maid-privacy/api/user", router);
};
