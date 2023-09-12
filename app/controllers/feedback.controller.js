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
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send("success");
  });
};


exports.deleteFeed = (req, res) => {
  const feedId = req.params.feedback_id;
  Feed.delete(feedId, (err, result) => {
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

exports.editFeed = (req, res) => {
  const feedId = req.params.feedback_id; // Assuming you get the id_user from the route parameter
  const updatedFeedData = req.body; // Assuming you send the updated user data in the request body

  // Call the edit method from the User model
  Feed.edit(feedId, updatedFeedData, (err, updatedFeed) => {
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
    res.json(updatedFeed);
  });
};



