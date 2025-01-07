const mongoose = require("mongoose");

async function connectToMongoDB(url) {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
    });
}

module.exports = {
  connectToMongoDB,
};
