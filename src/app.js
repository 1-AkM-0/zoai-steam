const express = require("express");
const jokeRoutes = require("./routes/jokeRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const allowedOrigins = process.env.ORIGIN.split(",");
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("NOT ALLOWED ORIGIN"));
      }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/jokes", jokeRoutes);
app.use("/api/auth", authRoutes);

const startServer = (port = process.env.PORT || 3000) => {
  app.listen(port, () => {
    console.log(`App runinng on ${port}`);
  });
};

module.exports = { startServer };
