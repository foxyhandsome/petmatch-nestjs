const sql = require("./db.js");

// constructor
const User = function (user) {
  this.id_user = user.id_user;
  this.username = user.username;
  this.password = user.password;
  this.fname = user.fname;
  this.lname = user.lname;
  this.phone = user.phone;
  this.roomnumber = user.roomnumber;
  this.roomsize = user.roomsize;
  this.maid_rating = user.maid_rating;
  this.type_id = user.type_id;
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

User.getAll = (result) => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("users: ", res);
    result(null, res);
  });
};


User.edit = (idUser, updatedUser, result) => {
  sql.query(
    "UPDATE user SET ? WHERE username = ?",
    [updatedUser, idUser],
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

      console.log("updated userresident with id: ", idUser);
      result(null, { username: idUser, ...updatedUser });
    }
  );
};

User.login = (username, password, result) => {
  sql.query(
    "SELECT * FROM user WHERE username_id = ? AND password_user = ?",
    [username, password],
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

User.delete = (userId, result) => {
  sql.query("DELETE FROM user WHERE username = ?", userId, (err, res) => {
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

    console.log("deleted user with id: ", userId);
    result(null, res);
  });
};

module.exports = User;
