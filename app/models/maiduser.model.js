const sql = require("./db.js");

// constructor
const Maid = function (maid) {
  this.maid_id = maid.maid_id;
  this.maid_username = maid.maid_username;
  this.maid_password = maid.maid_password;
  this.maid_fname = maid.maid_fname;
  this.maid_lname = maid.maid_lname;
  this.maid_phone = maid.maid_phone;
  this.type_id = maid.type_id;
};

Maid.create = (newMaid, result) => {
  sql.query("INSERT INTO maid SET ?", newMaid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.maid_username, ...newMaid });
    result(null, { id: res.maid_username, ...newMaid });
  });
};

Maid.edit = (idMaid, updatedMaid, result) => {
  sql.query(
    "UPDATE maid SET ? WHERE maid_id = ?",
    [updatedMaid, idMaid],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.affectedRows === 0) {
        // User with the specified id_user was not found
        result({ message: "userresident not found" }, null);
        return;
      }

      console.log("updated userresident with id: ", idMaid);
      result(null, { maid_id: idMaid, ...updatedMaid });
    }
  );
};

Maid.login = (maid_username, maid_password, result) => {
  sql.query(
    "SELECT * FROM maid WHERE maid_username = ? AND maid_password = ?",
    [maid_username, maid_password],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      if (res.length) {
        console.log("found user: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ message: "Invalid username or password" }, null);
    }
  );
};

Maid.delete = (maidId, result) => {
  sql.query("DELETE FROM maid WHERE maid_id = ?", maidId, (err, res) => {
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

    console.log("deleted user with id: ", maidId);
    result(null, res);
  });
};


module.exports = Maid;
