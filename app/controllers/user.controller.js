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
    username: req.body.username,
    password: req.body.password,
    information: req.body.information,
    contact: req.body.contact,
    id_district: req.body.id_district,
    id_subdistrict: req.body.id_subdistrict,
  });

  // Save Tutorial in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send("aaa");
  });
};
