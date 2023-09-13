const User = require("../models/user.model.js");

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
  const user = new User({
    id_user: req.body.id_user,
    username: req.body.username,
    password: req.body.password,
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
    roomnumber: req.body.roomnumber,
    roomsize: req.body.roomsize,
    maid_rating: req.body.maid_rating,
    type_id: req.body.type_id,

  });

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "พบข้อผิดพลาด.",
      });
    else res.send("สำเร็จ");
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "กรุณากรอกข้อมูลให้ครบ.",
    });
  }
  User.login(username, password, (err, user) => {
    if (err) {
      console.error("เกิดข้อผิดพลาด:", err);
      return res.status(500).json({
        message: "เกิดข้อผิดพลาด.",
      });
    }
    if (!user) {
      return res.status(401).json({
        message: "ผู้ใช้หรือรหัสผ่านไม่ถูกต้อง.",
      });
    }
    res.json({
      message: "ลงชื่อใช้งานสำเร็จ!",
      user,
    });
  });
};

exports.deleteUser = (req, res) => {
  const userId = req.params.username;
  User.delete(userId, (err, result) => {
    if (err) {
      console.error("เกิดข้อผิดพลาด:", err);

      if (err.message === "ไม่พบผู้ใช้งาน") {
        return res.status(404).json({
          message: "ไม่พบผู้ใช้งาน.",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาด.",
        });
      }
    }
    res.json({
      message: "ลบข้อมูลผู้ใช้สำเร็จ!",
      userId,
    });
    res.status(204).send();
  });
};

exports.findAllusers = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "เกิดข้อผิดพลาด.",
      });
    else res.send(data);
  });
};

exports.findAllusersByTypeId = (req, res) => {
  const typeID = req.params.type_id;

  User.getUserType(typeID, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "เกิดข้อผิดพลาด.",
      });
    else res.send(data);
  });
};

exports.editUser = (req, res) => {
  const userId = req.params.username; 
  const updatedUserData = req.body; 

  
  User.edit(userId, updatedUserData, (err, updatedUser) => {
    if (err) {
      console.error("เกิดข้อผิดพลาด:", err);

      if (err.message === "ไม่พบข้อมูลผู้ใช้งาน") {
        return res.status(404).json({
          message: "ไม่พบข้อมูลผู้ใช้งาน.",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาด.",
        });
      }
    }

    res.json(updatedUser);
  });
};


