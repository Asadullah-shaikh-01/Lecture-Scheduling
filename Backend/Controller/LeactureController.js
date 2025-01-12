import CourseModels from "../Models/CourseModels.js";
import Lecture from "../Models/LectureModels.js";


// Lecture Controller: Add new Lecture
export const addLectureController = async (req, res) => {
    try {
        const { title, description, courseId } = req.body;

        // Ensure the video file is provided
        if (!req.file) {
            return res.status(400).json({ message: " is required" });
        }

        // Find the course by ID and ensure it exists
        const course = await CourseModels.findById(id);
        if (!course) {
            return res.status(400).json({ message: "Course not found" });
        }

        // Create a new lecture
        const newLecture = new Lecture({
            title,
            description,
            video: {
                public_id: req.file.public_id,  // Cloudinary public_id for the video
                url: req.file.url,               // Cloudinary URL for the video
            },
            course: courseId,
        });

        // Save the new lecture to the database
        await newLecture.save();
        res.status(201).send({
            success:true,
            message:"Leature create sucessfully",
            newLecture
        });
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Get All Lectures for a Specific Course Controller
export const getLecturesForCourseController = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the course by ID and populate the lectures associated with it
        const course = await CourseModels.findById(id).populate("lectures");
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json(course.lectures);
    } catch (error) {
        console.log(error);
        res.status(501).send({
            success: false,
            message: "Internal Server Error"
        });
    }
};

// Update lecture

// Update Lecture Controller
export const updateLectureController = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // Find the lecture by ID and update it
        const updatedLecture = await Lecture.findByIdAndUpdate(
            id,
            { title, description },
            { new: true } // Return the updated document
        );

        if (!updatedLecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        res.status(200).send({
            success: true,
            message: "Lecture updated successfully",
            lecture: updatedLecture,
        });
    } catch (error) {
        console.error(error);
        res.status(501).send({
            success: false,
            message: "Internal Server Error",
        });
    }
};



// Delete Lecture Controller
export const deleteLectureController = async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the lecture
        const deletedLecture = await Lecture.findByIdAndDelete(id);
        if (!deletedLecture) {
            return res.status(404).json({ message: "Lecture not found" });
        }

        // Remove the lecture from the associated course
        await CourseModels.updateOne(
            { lectures: id },
            { $pull: { lectures: id } }
        );

        res.status(200).json({
            success: true,
            message: "Lecture deleted successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(501).send({
            success: false,
            message: "Internal Server Error",
        });
    }
};
