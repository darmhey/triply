const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({
  path: "./config.env",
});

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    //useFindAndModify: false,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.error(
      "Failed to connect to MongoDB............................................",
      err
    );
  });

//console.log(process.env);
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
