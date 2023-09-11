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
    username_id: req.body.username_id,
    password_user: req.body.password_user,
    user_fname: req.body.user_fname,
    user_lname: req.body.user_lname,
    user_phone: req.body.user_phone,
    roomsize: req.body.roomsize,
  });

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send("success");
  });
};
