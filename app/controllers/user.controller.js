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
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send("success");
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({
      message: "Username and password are required fields.",
    });
  }
  User.login(username, password, (err, user) => {
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

exports.deleteUser = (req, res) => {
  const userId = req.params.username;
  User.delete(userId, (err, result) => {
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

exports.findAllusers = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Users.",
      });
    else res.send(data);
  });
};

exports.editUser = (req, res) => {
  const userId = req.params.username; // Assuming you get the id_user from the route parameter
  const updatedUserData = req.body; // Assuming you send the updated user data in the request body

  // Call the edit method from the User model
  User.edit(userId, updatedUserData, (err, updatedUser) => {
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
    res.json(updatedUser);
  });
};


