const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

var connection = mysql.createPool({
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  dialect: "mysql",
  connectionLimit: 10, // Adjust the connection limit as needed
  connectTimeout: 20000, // Increase the connection timeout if needed
});

connection.getConnection(function (err, connection) {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database success");
  connection.release();
});
module.exports = connection;
