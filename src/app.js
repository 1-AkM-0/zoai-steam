const express = require("express");
const jokeRoutes = require("./routes/jokeRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/joke", jokeRoutes);
const startServer = (port = process.env.PORT || 3000) => {
  app.listen(port, () => {
    console.log(`App runinng on ${port}`);
  });
};

module.exports = { startServer };
