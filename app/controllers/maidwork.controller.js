const Work = require("../models/maidwork.model");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  console.log(req);

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
  }

  const work = new Work({
    id_worktime: req.body.id_worktime,
    status: req.body.status,
    workingtime: req.body.workingtime,
    endworking: req.body.endworking,
    id_user: req.body.id_user,

  });

  
  Work.create(work, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "เกิดข้อผิดพลาด.",
      });
    else res.send("สำเร็จ");
  });
};


exports.deleteWork = (req, res) => {
  const workId = req.params.id_worktime;
  Work.delete(workId, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาด:", err);

      if (err.message === "ไม่พบตารางงาน") {
        return res.status(404).json({
          message: "ไม่พบตารางงาน.",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาด.",
        });
      }
    }
    res.json({
      message: "ลบข้อมูลตารางงานสำเร็จ!",
      workId,
    });
    res.status(204).send();
  });
};

exports.findAllworks = (req, res) => {
  Work.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "เกิดข้อผิดพลาด.",
      });
    else res.send(data);
  });
};

exports.editWork = (req, res) => {
  const workId = req.params.id_worktime; 
  const updatedWorkData = req.body; 

  Work.edit(workId, updatedWorkData, (err, updatedWork) => {
    if (err) {
      console.error("เกิดข้อผิดพลาด:", err);

      if (err.message === "ไม่พบตารางงาน") {
        return res.status(404).json({
          message: "ไม่พบตารางงาน.",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาด.",
        });
      }
    }

    res.json(updatedWork);
  });
};


