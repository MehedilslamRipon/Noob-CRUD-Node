const fs = require("fs");

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

// tours handlers
// get all tours data
exports.getAllTours = (req, res) => {
   res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
         tours,
      },
   });
};

// get single tour data
exports.getSingleTourData = (req, res) => {
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
exports.writeData = (req, res) => {
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
exports.updateData = (req, res) => {
   if (req.params.id * 1 > tours.length) {
      res.status(404).json({
         status: "Failed",
         message: "Invalid ID",
      });
   }

   res.status(200).send("<h1> Updated tour here... </h1>");
};

// delete data
exports.deleteData = (req, res) => {
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
