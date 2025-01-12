import express from "express";
import {
    addCourseController,
    deleteCourseController,
    getAllCoursesController, getInstructorsController,
    updateCourseController
}
    from "../Controller/AdminController.js";
import { isAdmin, requiredLogin } from "../middleware/UserMiddleware.js";
import upload from "../middleware/imageMiddleware.js";
// import uploaded from "../middleware/VideoMiddleware.js";


const router = express.Router();

router.post("/instructors-create", requiredLogin, isAdmin, getInstructorsController);
router.post("/course-create", requiredLogin, isAdmin, upload.single('image'), addCourseController);
router.put("/course-update/id", requiredLogin, isAdmin, updateCourseController);
router.delete("/course-delete/id", requiredLogin, isAdmin, deleteCourseController);


router.get("/courses-all", requiredLogin, isAdmin, getAllCoursesController);

export default router;

