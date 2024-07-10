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
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
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

//mongoose schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

//mongoose model
const Tour = mongoose.model("Tour", tourSchema);

//creating a test document
const testTour = new Tour({
  name: "The Mountain hiker",
  rating: 4.8,
  price: 344,
});

testTour
  .save()
  .then((doc) => {
    console.log(doc);
  })
  .catch((err) => console.log(`ERROR 👹: ${err}`));
const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
