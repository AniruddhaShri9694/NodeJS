const express = require("express");
const app = express();
//const cors = require('cors'); 

const mongoose  = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

app.use(function(req, res, next) 
{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "*");

  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  req.header("Access-Control-Allow-Headers", "*");

  next();
});

app.use(express.json());

app.get("/", function(req, res) {
  res.send("Hello World! Header added");
});

const listinroutes = require("./routes/routing");

// MongoDB Connection
if (process.env.DB_STR) {
  mongoose.connect(process.env.DB_STR,
  { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => console.log("DB Connected"))
  .catch(err => console.error("DB Connection Error:", err));
} else {
  console.warn("DB_STR environment variable not set");
}

app.use("/api/listing", listinroutes);

// Local development server
const PORT = process.env.PORT || 2000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

module.exports = app;