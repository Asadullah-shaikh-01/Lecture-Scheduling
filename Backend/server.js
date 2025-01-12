import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./Util/DB.js"
import AdminRoutes from './routes/AdminRoutes.js'
import UserRoutes from './routes/UserRoues.js'
import morgan from "morgan";
import instucterRoutes from './routes/instructerRoutes.js'
import cors from 'cors';


dotenv.config();


const app = express();
// middelware
app.use(cors())
app.use(express.json());
app.use(morgan('dev'))


app.use("/api/v1/admin", AdminRoutes);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/instucter", instucterRoutes);


// app.use("/api/instructor", instructorRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});
