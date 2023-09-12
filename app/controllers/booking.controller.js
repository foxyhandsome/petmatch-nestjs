const Book = require("../models/booking.model");


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
  const book = new Book({
    booking_id: req.body.booking_id,
    booking_date: req.body.booking_date,
    work_hour: req.body.work_hour,
    service_price: req.body.service_price,
    paymentslip: req.body.paymentslip,
    maid_rating: req.body.maid_rating,
    status: req.body.status,
    id_user: req.body.id_user,

  });

  // Save Tutorial in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User.",
      });
    else res.send("success");
  });
};


exports.deleteBook = (req, res) => {
  const bookId = req.params.booking_id;
  Book.delete(bookId, (err, result) => {
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

exports.editBook = (req, res) => {
  const idBook = req.params.booking_id; // Assuming you get the id_user from the route parameter
  const updatedBookData = req.body; // Assuming you send the updated user data in the request body

  // Call the edit method from the User model
  Book.edit(idBook, updatedBookData, (err, updatedBook) => {
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
    res.json(updatedBook);
  });
};



