const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalError = require("./controllers/errorController");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
//const reviewRouter = require("./routes/reviewRoutes");

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  //console.log(req.headers);
  next();
});

// console.log(process.env.NODE_ENV);
// if (process.env.NODE_ENV === "development") {
//   app.use(morgan("dev"));
// }

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);
//app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`), 404);
});

app.use(globalError);

module.exports = app;
