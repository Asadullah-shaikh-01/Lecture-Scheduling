import InstructorModels from "../Models/InstructorModels.js";
import Course from "../Models/CourseModels.js"; // Assuming you have a Course model
import Lecture from "../Models/LectureModels.js"; // Assuming you have a Lecture model
import bcrypt from "bcrypt";


// Instructor Controller: Add new Instructor
export const getInstructorsController = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingInstructor = await InstructorModels.findOne({ email });
        if (existingInstructor) {
            return res.status(400).json({ message: "Instructor already exists." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create and save the new instructor
        const newInstructor = new InstructorModels({
            name,
            email,
            password: hashedPassword,
        });

        await newInstructor.save();
        res.status(201).json(newInstructor);
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Course Controller: Add new Course
export const addCourseController = async (req, res) => {
    try {
        const { name, level, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: "Image is required" });
        }

        const newCourse = new Course({
            name,
            level,
            description,
            image: {
                public_id: req.file.filename, // Assuming your Cloudinary filename
                url: req.file.path, // The path for the image
            },
        });

        await newCourse.save();
        res.status(201).json(newCourse);
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get All Courses Controller
export const getAllCoursesController = async (req, res) => {
    try {
        const courses = await Course.find().populate("instructor"); // Populate instructor details if needed
        res.status(200).json(courses);
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update Course Controller
export const updateCourseController = async (req, res) => {
    try {
        const { id } = req.params; // Course ID from request params
        const { name, level, description } = req.body; // Updated course data

        // Find and update the course
        const updatedCourse = await CourseModels.findByIdAndUpdate(
            id,
            { name, level, description },
            { new: true } // Return the updated document
        );

        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course: updatedCourse,
        });
    } catch (error) {
        console.error(error);
        res.status(501).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

// Delete Course Controller
export const deleteCourseController = async (req, res) => {
    try {
        const { id } = req.params; // Course ID from request params

        // Find the course by ID and delete it
        const deletedCourse = await CourseModels.findByIdAndDelete(id);
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Delete associated lectures if needed (optional cleanup logic)
        await Lecture.deleteMany({ _id: { $in: deletedCourse.lectures } });

        res.status(200).json({
            success: true,
            message: "Course deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(501).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

