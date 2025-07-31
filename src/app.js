const express = require("express");
const jokeRoutes = require("./routes/jokeRoutes");
// 76561198918812796

const app = express();
app.use(express.json());
app.use(express.urlencoded(true));
app.use("/joke", jokeRoutes);
const startServer = (port = process.env.PORT || 3000) => {
  app.listen(port, () => {
    console.log(`App runinng on ${port}`);
  });
};

module.exports = { startServer };
