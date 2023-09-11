const sql = require("./db.js");

// constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.information = user.information;
  this.contact = user.contact;
  this.id_district = user.id_district;
  this.id_subdistrict = user.id_subdistrict;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created user: ", { id: res.username, ...newUser });
    result(null, { id: res.username, ...newUser });
  });
};

module.exports = User;
