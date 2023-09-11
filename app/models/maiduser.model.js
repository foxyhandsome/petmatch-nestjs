const sql = require("./db.js");

// constructor
const Maid = function (maid) {
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

module.exports = Maid;
