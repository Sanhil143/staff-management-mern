const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(
      process.env.DB_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Mongo DB is connected'.rainbow);
  } catch (err) {
    console.error("error :", err.message);
  }
};

module.exports = dbConnection;