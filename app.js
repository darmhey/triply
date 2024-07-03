const fs = require("fs");
const express = require("express");

const app = express();
//middleware for post
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

//get api for tours
app.get("/api/v1/tours", (req, res) => {
  res.status(200).json({
    status: "success",
    results: tours.length,
    data: {
      tours,
    },
  });
});

//post api for tours
app.post("/api/v1/tours", (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: "success",
        data: {
          tour: newTour,
        },
      });
    }
  );
});

//get tour with specific param - specific param endpoint
app.get("/api/v1/tours/:id", (req, res) => {
  //console.log(req.params);
  //id from params is a string so we use this method to convert it to int
  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: "success",
    data: {
      tour,
    },
  });
});

// app.get("/", (req, res) => {
//   res.status(200).send("Hello from the server side");
// });

// app.post("/", (req, res) => {
//   res.status(200).send("You can post here");
// });

const port = 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
