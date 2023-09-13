module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const booking = require("../controllers/booking.controller");
  const feed = require("../controllers/feedback.controller");
  const work = require("../controllers/maidwork.controller");

  var router = require("express").Router();

  router.post("/create-user", user.create);
  router.post("/create-book", booking.create);
  router.post("/create-feed", feed.create);
  router.post("/create-work", work.create);

  
  router.get("/findallusers",user.findAllusers);
  router.get("/findallbook",booking.findAllbook);
  router.get("/findallfeed",feed.findAllfeed);
  router.get("/findallwork",work.findAllworks);


  router.delete("/delete/:username", user.deleteUser);
  router.delete("/deletebook/:booking_id", booking.deleteBook);
  router.delete("/deletefeed/:feedback_id", feed.deleteFeed);
  router.delete("/deletework/:id_worktime", work.deleteWork);

  router.put("/edit/:username", user.editUser);
  router.put("/editbook/:booking_id", booking.editBook);
  router.put("/editfeed/:feedback_id", feed.editFeed);
  router.put("/editwork/:id_worktime", work.editWork);

  app.use("/maid-privacy/api/user", router);
};
