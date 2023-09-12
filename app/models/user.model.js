const sql = require("./db.js");

// constructor
const User = function (user) {
  this.room_id = user.room_id;
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

User.post = (idUser, result) => {
  sql.query("SELECT * FROM userresident WHERE username_id = ?", idUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("show user: ", { id: res.username_id, ...idUser });
    result(null, { id: res.username_id, ...idUser });
  });
};


User.edit = (idUser, updatedUser, result) => {
  sql.query(
    "UPDATE userresident SET ? WHERE room_id = ?",
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
      result(null, { room_id: idUser, ...updatedUser });
    }
  );
};

User.login = (username_id, password_user, result) => {
  sql.query(
    "SELECT * FROM userresident WHERE username_id = ? AND password_user = ?",
    [username_id, password_user],
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
  sql.query("DELETE FROM userresident WHERE room_id = ?", userId, (err, res) => {
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
