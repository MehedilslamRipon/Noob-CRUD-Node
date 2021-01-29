const express = require("express");
const {
   getAllTours,
   writeData,
   getSingleTourData,
   updateData,
   deleteData,
} = require("./../controllers/tourControllers");

const router = express.Router();

router.route("/").get(getAllTours).post(writeData);
router
   .route("/:id")
   .get(getSingleTourData)
   .patch(updateData)
   .delete(deleteData);

// exports
module.exports = router;
