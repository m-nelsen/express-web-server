const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

require("dotenv").config();
require("./strategies/local");
require("./database");

// Routes
const authRoutes = require("./routes/auth");
const weddingRoutes = require("./routes/wedding");
const projectRoutes = require("./routes/projects");

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth", authRoutes);
app.use("/api/wedding", weddingRoutes);
app.use("", projectRoutes);

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
