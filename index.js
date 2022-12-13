const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/clients", require("./routes/clientRoutes"));

app.get("/", (req, res) => {
  res.send("Working");
});

port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Connected to port ${port}`));
