const sql = require("./db.js");

// constructor
const Work = function (work) {
  this.id_worktime = work.id_worktime;
  this.status = work.status;
  this.workingtime = work.workingtime;
  this.endworking = work.endworking;
  this.id_user = work.id_user;
};

Work.create = (newWork, result) => {
  sql.query("INSERT INTO maidwork SET ?", newWork, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.workingtime, ...newWork });
    result(null, { id: res.workingtime, ...newWork });
  });
};

Work.getAll = (result) => {
  sql.query("SELECT * FROM maidwork", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("work: ", res);
    result(null, res);
  });
};


Work.edit = (idWork, updatedWork, result) => {
  sql.query(
    "UPDATE maidwork SET ? WHERE id_worktime = ?",
    [updatedWork, idWork],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // User with the specified id_user was not found
        result({ message: "maidwork not found" }, null);
        return;
      }

      console.log("updated maidwork with id: ", idWork);
      result(null, { id_worktime: idWork, ...updatedWork });
    }
  );
};

Work.delete = (workId, result) => {
  sql.query("DELETE FROM maidwork WHERE id_worktime = ?", workId, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows === 0) {
      // User with the specified user_id was not found
      result({ message: "maidwork not found" }, null);
      return;
    }

    console.log("deleted maidwork with id: ", workId);
    result(null, res);
  });
};

module.exports = Work;
