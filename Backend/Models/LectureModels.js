import mongoose from "mongoose";

const lectureSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    video: {
        public_id: { type: String },
        url: { type: String },
    },
    course: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
}, { timestamps: true });

const Lecture = mongoose.model("Lecture", lectureSchema);
export default Lecture;
