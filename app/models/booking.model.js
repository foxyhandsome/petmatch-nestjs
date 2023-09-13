const sql = require("./db.js");

// constructor
const Book = function (book) {
  this.booking_id	 = book.booking_id	;
  this.booking_date	 = book.booking_date	;
  this.work_hour = book.work_hour;
  this.service_price = book.service_price;
  this.paymentslip = book.paymentslip;
  this.maid_rating = book.maid_rating;
  this.status = book.status;
  this.user_booking = book.user_booking;
  this.maidbooking = book.maidbooking;
};

Book.create = (newBook, result) => {
  sql.query("INSERT INTO booking SET ?", newBook, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created book: ", { id: res.booking_date, ...newBook });
    result(null, { id: res.booking_date, ...newBook });
  });
};

Book.getAll = (result) => {
  sql.query("SELECT * FROM booking", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("work: ", res);
    result(null, res);
  });
};


Book.edit = (idBook, updatedBook, result) => {
  sql.query(
    "UPDATE booking SET ? WHERE booking_id = ?",
    [updatedBook, idBook],
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

      console.log("updated userresident with id: ", idBook);
      result(null, { booking_id: idBook, ...updatedBook });
    }
  );
};

Book.delete = (bookID, result) => {
  sql.query("DELETE FROM userresident WHERE booking_id = ?", bookID, (err, res) => {
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

    console.log("deleted user with id: ", bookID);
    result(null, res);
  });
};

module.exports = Book;
