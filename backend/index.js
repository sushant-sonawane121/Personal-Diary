const express = require("express");
const app = express();

const port = 8000;
const connectDB = require("./src/connectDB");

const cors = require("cors");
app.use(cors());

// connect to db
connectDB();
app.use(express.json());

//router
const router = require("./src/router");
app.use("/", router);


app.listen(port, (err) => {
  if (err) {
    console.log("Error starting server:", err);
  } else {
    console.log(`Your app is listening on http://localhost:${port}`);
  }
});
