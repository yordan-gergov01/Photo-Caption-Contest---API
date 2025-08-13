const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");

const app = express();

app.use(express.json({ limit: "10kb" }));

app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.use(helmet());

app.use(cookieParser());

app.use(cors());
app.use(morgan("combined"));

const limiter = rateLimit({
  max: 100,
  windowsNs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.get("/health", (req, res) => {
  res.json({ message: "OK" });
});

app.all("*", (req, res, next) => {
  next(new AppError(`Can't fine ${req.originalUrl} on this server.`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
