const express = require("express");
const authRoute = require("./routes/authtRoute");
const packageRoute = require("./routes/packageRoute");
const rateLimit = require("express-rate-limit");
const updatePackage = require("./middleware/update.middleware");
const helmet = require("helmet");
const logger = require("./logger/logger");
const httpLogger = require("./logger/httpLogger");
const verify = require("./middleware/verifyToken");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const limiter = rateLimit({
  windowMs: 0.5 * 60 * 1000,
  max: 4,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(httpLogger);
app.use(helmet());
const PORT = process.env.PORT;

app.use("/user", authRoute);
app.use(updatePackage.updatePackage);
app.use("/package", verify.verifyToken, packageRoute);


app.use("/", (req, res) => {
    res.status(200).send("WELCOME TO MY PACKAGE API");
  });

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    data: null,
    error: logger.error("Server Error"),
  });
});

app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}`);
});
