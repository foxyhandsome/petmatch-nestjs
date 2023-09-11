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
    maid_id: req.body.maid_id,
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

exports.loginMaid = (req, res) => {
  const { maid_username, maid_password } = req.body;
  if (!maid_username || !maid_password) {
    return res.status(400).json({
      message: "Username and password are required fields.",
    });
  }
  Maid.login(maid_username, maid_password, (err, user) => {
    if (err) {
      console.error("Error during login:", err);
      return res.status(500).json({
        message: "An error occurred while attempting to log in.",
      });
    }
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password.",
      });
    }
    res.json({
      message: "Login successful!",
      user,
    });
  });
};

exports.deleteMaid = (req, res) => {
  const maidId = req.params.maid_id;
  Maid.delete(maidId, (err, result) => {
    if (err) {
      console.error("Error during user deletion:", err);

      if (err.message === "User not found") {
        return res.status(404).json({
          message: "User not found.",
        });
      } else {
        return res.status(500).json({
          message: "An error occurred while deleting the user.",
        });
      }
    }
    res.status(204).send();
  });
};

exports.editMaid = (req, res) => {
  const maidId = req.params.maid_id; // Assuming you get the id_user from the route parameter
  const updatedMaidData = req.body; // Assuming you send the updated user data in the request body

  // Call the edit method from the User model
  Maid.edit(maidId, updatedMaidData, (err, updatedMaidData) => {
    if (err) {
      console.error("Error during user editing:", err);

      if (err.message === "User not found") {
        return res.status(404).json({
          message: "User not found.",
        });
      } else {
        return res.status(500).json({
          message: "An error occurred while editing the user.",
        });
      }
    }

    // User edited successfully
    res.json(updatedMaidData);
  });
};



