const sql = require("./db.js");

// constructor
const User = function (user) {
  this.username_id = user.username_id;
  this.password_user = user.password_user;
  this.user_fname = user.user_fname;
  this.user_lname = user.user_lname;
  this.user_phone = user.user_phone;
  this.roomsize = user.roomsize;
  this.type_id = user.type_id;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO userresident SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.username_id, ...newUser });
    result(null, { id: res.username_id, ...newUser });
  });
};

module.exports = User;
