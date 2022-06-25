const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/Auth");
const userRoute = require("./routes/Users");
const postRoute = require("./routes/Posts");
const categoryRoute = require("./routes/Categories");
const cors = require("cors");
const passportSetup = require("./passport");
var bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
const auth2Route = require("./routes/Auth2");
const passport = require("passport");

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

dotenv.config();

// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(
  cookieSession({
    name: "session",
    keys: ["prvKey"],
    maxAge: 24 * 60 * 60 * 100,
    // maxAge: 30 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);
app.use("/auth", auth2Route);

app.post("/api/watchproximity", async (req, res) => {
  try {
    const autom = { count: 8 };
    res.status(200).json(autom);
    console.log(req.body);
  } catch {
    res.status(500).json(req.body);
    console.log(err);
  }
});

app.listen("5000", () => {
  console.log("Backend is running");
});
