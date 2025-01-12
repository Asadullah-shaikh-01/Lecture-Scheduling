import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: {
        type: String,
        required: true
    },
    description: { type: String, required: true },
    image: {
        public_id: { type: String, required: true },
        url: { type: String, required: true },
    },

});

export default mongoose.model("Course", courseSchema);

