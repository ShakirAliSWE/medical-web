const mongoose = require("mongoose");

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_URI = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@medical-web.vtvknuo.mongodb.net/${DB_NAME}`;

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.error("Error connecting to Database:", error.message);
    throw error;
  }
}

module.exports = connectToDatabase;
