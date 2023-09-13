const Book = require("../models/booking.model");


// อันนี้สร้างการจองน่ะ
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
    user_booking: req.body.user_booking,
    maidbooking: req.body.maidbooking,
  });


  // Save Tutorial in the database
  Book.create(book, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "ไม่สามารถจองคิวได้",
      });
    else res.send("การจองคิวสำเร็จ");
  });
};

exports.findAllbook = (req, res) => {
  Book.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "หาประวัติการจองไม่เจอ",
      });
    else res.send(data);
  });
};


exports.deleteBook = (req, res) => {
  const bookId = req.params.booking_id;
  Book.delete(bookId, (err, result) => {
    if (err) {
      console.error("หาประวัติการจองไม่เจอ:", err);

      if (err.message === "Book not found") {
        return res.status(404).json({
          message: "ไม่พบการจอง.",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาด.",
        });
      }
    }
    res.json({
      message: "ลบข้อมูล!",
      userId,
    });
    res.status(204).send();
  });
};

exports.editBook = (req, res) => {
  const idBook = req.params.booking_id; // Assuming you get the id_user from the route parameter
  const updatedBookData = req.body; // Assuming you send the updated user data in the request body

  // Call the edit method from the User model
  Book.edit(idBook, updatedBookData, (err, updatedBook) => {
    if (err) {
      console.error("ไม่สามารถแก้ไขข้อมูลการจองได้:", err);

      if (err.message === "Book not found") {
        return res.status(404).json({
          message: "ไม่พบการจอง.",
        });
      } else {
        return res.status(500).json({
          message: "เกิดข้อผิดพลาดการแก้ไขการจอง.",
        });
      }
    }

    
    res.json(updatedBook);
  });
};



