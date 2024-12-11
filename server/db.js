const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Phone");

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongodb is connected");
});

db.on("error", () => {
  console.log("Error");
});

module.exports = mongoose;
