const express = require("express");
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
app.use(express.json());

//MIDDLEWARE

// app.use(morgan("dev"));
// app.use((req, res, next) => {
//   console.log("Hello from the middleware");
//   next();
// });

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tours", tourRouter);

//START SERVER

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
