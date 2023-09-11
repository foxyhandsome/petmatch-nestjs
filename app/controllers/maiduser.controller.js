const Maid = require("../models/maiduser.model");

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
  const maid = new Maid({
    maid_username: req.body.maid_username,
    maid_password: req.body.maid_password,
    maid_fname: req.body.maid_fname,
    maid_lname: req.body.maid_lname,
    maid_phone: req.body.maid_phone,
    type_id: req.body.type_id,
  });

  // Save Tutorial in the database
  Maid.create(maid, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send("success");
  });
};
