const mongoose = require("mongoose");

//mongoose schema
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
  duration: {
    type: Number,
    required: [true, "A tour must have duration"],
  },
  maxGroupSize: {
    type: Number,
    required: [true, "A tour must have group size"],
  },
  difficulty: {
    type: String,
    required: [true, "A tour must have difficulty level"],
    // enum: {
    //   values: ["easy", "medium", "difficult"],
    //   message: "Difficulty is either: easy, medium, difficult",
    // },
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    // min: [1, "Rating must be above 1.0"],
    // max: [5, "Rating must be below 5.0"],
  },
  summary: {
    type: String,
    trim: true,
    required: [true, "A tour must have description"],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A tour must have a cover image"],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
  secretTour: {
    type: Boolean,
    default: false,
  },
  startLocation: {
    // GeoJSON
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  locations: [
    {
      type: {
        type: String,
        default: "Point",
        enum: ["Point"],
      },
      coordinates: [Number],
      address: String,
      description: String,
      day: Number,
    },
  ],
});

//DOCUMENT middleware runs before .save() and .create()
// tourSchema.pre("save", function () {
//   console.log(this);
// });
//mongoose model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
