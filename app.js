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
console.log("=== MongoDB Connection Status ===");
if (process.env.DB_STR) {
  console.log("DB_STR found, attempting to connect...");
  mongoose.connect(process.env.DB_STR,
  { useNewUrlParser: true , useUnifiedTopology: true })
  .then(() => {
    console.log("✓ DB Connected Successfully");
    console.log("MongoDB URI:", process.env.DB_STR.substring(0, 50) + "...");
  })
  .catch(err => {
    console.error("✗ DB Connection Error:", err.message);
  });
} else {
  console.warn("⚠ DB_STR environment variable not set");
  console.warn("Please configure DB_STR in .env file");
}
console.log("==================================\n");

app.use("/api/listing", listinroutes);

// Local development server
const PORT = process.env.PORT || 2000;
if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log("\n╔════════════════════════════════════╗");
    console.log("║   SERVER STARTED SUCCESSFULLY      ║");
    console.log("╚════════════════════════════════════╝");
    console.log(`\n🔗 Server: http://localhost:${PORT}`);
    console.log(`📡 Environment: ${process.env.NODE_ENV}`);
    console.log("\n✓ API Endpoints:");
    console.log(`   - GET  / (Root)`);
    console.log(`   - GET  /api/listing/check`);
    console.log(`   - POST /api/listing/register`);
    console.log(`   - POST /api/listing/login`);
    console.log(`   - POST /api/listing/addmenu`);
    console.log(`   - GET  /api/listing/fetchmenu`);
    console.log(`   - POST /api/listing/deletemenu\n`);
  });
}

module.exports = app;