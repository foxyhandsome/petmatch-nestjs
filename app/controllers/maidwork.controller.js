const Work = require("../models/maidwork.model");

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
  const work = new Work({
    id_worktime: req.body.id_worktime,
    status: req.body.status,
    workingtime: req.body.workingtime,
    endworking: req.body.endworking,
    id_user: req.body.id_user,

  });

  // Save Tutorial in the database
  Work.create(work, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Work.",
      });
    else res.send("success");
  });
};


exports.deleteWork = (req, res) => {
  const workId = req.params.id_worktime;
  Work.delete(workId, (err, result) => {
    if (err) {
      console.error("Error during work deletion:", err);

      if (err.message === "User not found") {
        return res.status(404).json({
          message: "Work not found.",
        });
      } else {
        return res.status(500).json({
          message: "An error occurred while deleting the work.",
        });
      }
    }
    res.status(204).send();
  });
};

exports.findAllworks = (req, res) => {
  Work.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Work.",
      });
    else res.send(data);
  });
};

exports.editWork = (req, res) => {
  const workId = req.params.id_worktime; // Assuming you get the id_user from the route parameter
  const updatedWorkData = req.body; // Assuming you send the updated user data in the request body

  // Call the edit method from the User model
  Work.edit(workId, updatedWorkData, (err, updatedWork) => {
    if (err) {
      console.error("Error during work editing:", err);

      if (err.message === "User not found") {
        return res.status(404).json({
          message: "Work not found.",
        });
      } else {
        return res.status(500).json({
          message: "An error occurred while editing the work.",
        });
      }
    }

    // User edited successfully
    res.json(updatedWork);
  });
};


