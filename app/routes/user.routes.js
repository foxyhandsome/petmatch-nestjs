module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const booking = require("../controllers/booking.controller");
  const feed = require("../controllers/feedback.controller");
  const work = require("../controllers/maidwork.controller");

  var router = require("express").Router();

  //ลิ้งค์สำหรับสร้างรายการต่างๆอิอิ
  router.post("/create-user", user.create);
  router.post("/create-book", booking.create);
  router.post("/create-feed", feed.create);
  router.post("/create-work", work.create);

  //ล็อกอินน่ะจ้ะ
  router.post("/login-user", user.login);

  //เรียกดูข้อมูลต่างๆน่ะจ้ะ
  router.get("/findallusers",user.findAllusers);
  router.get("/findallusers/:type_id",user.findAllusersByTypeId);
  router.get("/findallbook",booking.findAllbook);
  router.get("/findallfeed",feed.findAllfeed);
  router.get("/findallwork",work.findAllworks);


  //ลบข้อมูลน่ะจ้ะ
  router.delete("/delete/:username", user.deleteUser);
  router.delete("/deletebook/:booking_id", booking.deleteBook);
  router.delete("/deletefeed/:feedback_id", feed.deleteFeed);
  router.delete("/deletework/:id_worktime", work.deleteWork);

  //แก้ไขข้อมูลน่ะจ้ะ
  router.put("/edit/:username", user.editUser);
  router.put("/editbook/:booking_id", booking.editBook);
  router.put("/editfeed/:feedback_id", feed.editFeed);
  router.put("/editwork/:id_worktime", work.editWork);

  //อย่าลืมลิ้งค์apiเริ่มต้นนี้น่ะจ้ะใส่ก่อนลิ้งค์ต่างๆก่อนยิงข้อมูลอิอิ
  app.use("/maid-privacy/api/user", router);
};
