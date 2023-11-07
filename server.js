const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");

//env config
dotenv.config();

//routers
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

//rest object
const app = express();

//rest middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

//mongodb connection
connectDB();

//routes

// app.get("/", (req, resp) => {
//   resp.send({
//     message: "Anmol kumar is here",
//   });
//   console.log(`successfully running at ${PORT}`);
// });

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);
//listen
const PORT = process.env.PORT;
app.listen(PORT);
