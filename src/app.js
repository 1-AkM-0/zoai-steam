const express = require("express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const jokeRoutes = require("./routes/jokeRoutes");
const authRoutes = require("./routes/authRoutes");
const cors = require("cors");
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
  })
);

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do ZoAi steam",
      version: "1.0.0",
      description: "Documentação da API do ZoAi",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.js"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("trust proxy", 1);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use("/api/jokes", jokeRoutes);
app.use("/api/auth", authRoutes);

const startServer = (port = process.env.PORT || 3000) => {
  app.listen(port, () => {
    console.log(`App runinng on ${port}`);
  });
};

module.exports = { startServer };
