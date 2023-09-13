const Feed = require("../models/feedback.model");


// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(req);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }
  // Create a User
  const feed = new Feed({
    feedback_id: req.body.feedback_id,
    feedback_description: req.body.feedback_description,
    id_user: req.body.id_user,
   
  });

  // Save Tutorial in the database
  Feed.create(feed, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "เกิดข้อผิดพลาดในการสร้าง.",
      });
    else res.send("การสร้างสำเร็จ");
  });
};

exports.findAllfeed = (req, res) => {
  Feed.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "เกิดข้อผลาดในการสร้าง.",
      });
    else res.send(data);
  });
};

exports.deleteFeed = (req, res) => {
  const feedId = req.params.feedback_id;
  Feed.delete(feedId, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการลบ:", err);

      if (err.message === "ไม่พบการรายงาน") {
        return res.status(404).json({
          message: "ไม่พบการรายงาน.",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาด.",
        });
      }
    }
    res.json({
      message: "ลบข้อมูลสำเร็จ!",
      userId,
    });
    res.status(204).send();
  });
};

exports.editFeed = (req, res) => {
  const feedId = req.params.feedback_id; 
  const updatedFeedData = req.body; 

  Feed.edit(feedId, updatedFeedData, (err, updatedFeed) => {
    if (err) {
      console.error("เกิดข้อผิดพลาดในการแก้ไข:", err);

      if (err.message === "ไม่พบการรายงาน") {
        return res.status(404).json({
          message: "ไม่พบการรายงาน.",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาด.",
        });
      }
    }

    res.json(updatedFeed);
  });
};



