import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
   UserName: {
      type: String,
      required: true
   },
   Email: {
      type: String,
      required: true,
      unique: true

   },
   Password: {
      type: String,
      require: true
   },
   Role: {
      type: Number,
      default: 0,
   },
}, { timestamps:true })


export default mongoose.model("User", userSchema);