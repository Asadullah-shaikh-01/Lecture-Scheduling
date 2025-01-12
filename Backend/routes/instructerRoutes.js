import upload from "../middleware/imageMiddleware.js";
import express from "express";
import { addLectureController, deleteLectureController, getLecturesForCourseController, updateLectureController } from "../Controller/LeactureController.js";
import { isAdmin, requiredLogin } from "../middleware/UserMiddleware.js";
// const { getInstructorLectures } = require("../controllers/instructorController");

const router = express.Router();

router.post("/add-lecture", requiredLogin, isAdmin, upload.single('video'), addLectureController);

router.put("/update-lecture/id", requiredLogin, isAdmin, upload.single('video'), updateLectureController);

router.delete("/delete-lecture/id", requiredLogin, isAdmin, deleteLectureController);

router.get("/all-lectures", getLecturesForCourseController);


export default router;
