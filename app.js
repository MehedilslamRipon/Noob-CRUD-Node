// dependencies
const express = require("express");
const fs = require("fs");

const app = express();

// middleware
app.use(express.json());

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get all tours data
const getAllTours = (req, res) => {
   res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
         tours,
      },
   });
};

// get single tour data
const getSingleTourData = (req, res) => {
   console.log(req.params);

   const id = req.params.id * 1;

   const tour = tours.find((el) => {
      return el.id === id;
   });

   if (!tour) {
      return res.status(404).json({
         status: "Failed",
         message: "Invalid ID",
      });
   }

   res.status(200).json({
      status: "success",
      tour,
   });
};

// write data
const writeData = (req, res) => {
   const newId = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({ id: newId }, req.body);

   tours.push(newTour);

   // write data in file system
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
};

// delete data
const updateData = (req, res) => {
   if (req.params.id * 1 > tours.length) {
      res.status(404).json({
         status: "Failed",
         message: "Invalid ID",
      });
   }

   res.status(200).send("<h1> Updated tour here... </h1>");
};

// delete data
const deleteData = (req, res) => {
   if (req.params.id * 1 > tours.length) {
      res.status(404).json({
         status: "Failed",
         message: "Invalid ID",
      });
   }

   res.status(204).json({
      status: "success",
      data: null,
   });
};

// routes
// get all tours data route
// app.get("/api/v1/tours", getAllTours);

// get single tour data route
// app.get("/api/v1/tours/:id", getSingleTourData);

// write data route
// app.post("/api/v1/tours", writeData);

// update data
// app.patch("/api/v1/tours/:id", updateData);

// delete data route
// app.delete("/api/v1/tours/:id", deleteData);

// routes
app.route("/api/v1/tours").get(getAllTours).post(writeData);
app.route("/api/v1/tours/:id")
   .get(getSingleTourData)
   .patch(updateData)
   .delete(deleteData);

// server port
const PORT = 3000;

app.listen(PORT, () => {
   console.log(`Server is running on PORT: ${PORT}`);
});
