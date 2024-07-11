const Tour = require("./../models/tourModel");
const APIFeatures = require("./../utils/apiFeatures");

exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const tours = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err,
    });
  }
  //   // BUILD QUERY BE MUTATING QUERY OBJ
  //   //1a - filtering
  //   const queryObj = { ...req.query };
  //   excludeFields = ["page", "sort", "limit", "fields"];
  //   excludeFields.forEach((element) => {
  //     delete queryObj[element];
  //   });

  //   //1b - advanced filtering
  //   let queryStr = JSON.stringify(queryObj);
  //   queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  //   // console.log(JSON.parse(queryStr));

  //   let query = Tour.find(JSON.parse(queryStr));

  //   //2 - sorting
  //   if (req.query.sort) {
  //     const sortBy = req.query.sort.split(",").join(" ");
  //     query = query.sort(sortBy);
  //   } else {
  //     query = query.sort("-createdAt");
  //   }

  //   //3 - limiting fields
  //   if (req.query.fields) {
  //     const fields = req.query.fields.split(",").join(" ");
  //     query = query.select(fields);
  //   } else {
  //     query = query.select("-__v");
  //   }

  //   //4 - Pagination
  //   const page = req.query.page * 1 || 1;
  //   const limit = req.query.limit * 1 || 100;
  //   const skip = (page - 1) * limit;

  //   query = query.skip(skip).limit(limit);

  //   if (req.query.page) {
  //     const numTours = await Tour.countDocuments();
  //     if (skip >= numTours) throw new Error("This page does not exist");
  //   }

  //   // EXECUTE QUERY
  //   const tours = await query;
  //   console.log(req.query, queryObj);

  //   // const tours = await Tour.find()
  //   //   .where("duration")
  //   //   .equals(5)
  //   //   .where("difficulty")
  //   //   .equals("easy");

  //   res.status(200).json({
  //     status: "success",
  //     results: tours.length,
  //     data: {
  //       tours,
  //     },
  //   });
  // } catch (error) {
  //   res.status(400).json({
  //     status: "Fail",
  //     message: error,
  //   });
  // }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: error,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "Success",
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: "Invalid tour creation",
    });
  }
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);

  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     res.status(201).json({
  //       status: "success",
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(201).json({
      status: "Success",
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "Fail",
      message: "Invalid tour update",
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: "Fail",
      data: error,
    });
  }
};
