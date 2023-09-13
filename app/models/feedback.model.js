const sql = require("./db.js");

// constructor
const Feedback = function (feedback) {
  this.feedback_id = feedback.feedback_id;
  this.feedback_description = feedback.feedback_description;
  this.id_user = feedback.id_user;
};

Feedback.create = (newFeed, result) => {
  sql.query("INSERT INTO feedback SET ?", newFeed, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.feedback_id, ...newFeed });
    result(null, { id: res.feedback_id, ...newFeed });
  });
};

Feedback.getAll = (result) => {
  sql.query("SELECT * FROM feedback", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("work: ", res);
    result(null, res);
  });
};

Feedback.edit = (idFeed, updatedFeed, result) => {
  sql.query(
    "UPDATE feedback SET ? WHERE feedback_id = ?",
    [updatedFeed, idFeed],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // User with the specified id_user was not found
        result({ message: "feedback not found" }, null);
        return;
      }

      console.log("updated feedback with id: ", idFeed);
      result(null, { feedback_id: idFeed, ...updatedFeed });
    }
  );
};


Feedback.delete = (userFeed, result) => {
  sql.query("DELETE FROM feedback WHERE feedback_id = ?", userFeed, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      // User with the specified user_id was not found
      result({ message: "User not found" }, null);
      return;
    }

    console.log("deleted user with id: ", userFeed);
    result(null, res);
  });
};

module.exports = Feedback;
