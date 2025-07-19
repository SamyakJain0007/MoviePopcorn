import  express  from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-router.js";
import adminRouter from "./routes/admin-router.js";
import movieRouter from "./routes/movie-router.js";
import bookingsRouter from "./routes/booking-router.js";
import cors from "cors";


dotenv.config();
const app = express();

// middlewears
app.use(cors());
app.use(express.json())
  app.use("/user", userRouter);
  app.use("/admin", adminRouter);
  app.use("/movie", movieRouter);
   app.use("/booking",bookingsRouter);

mongoose
  .connect(
    `mongodb+srv://samyakjain200482:8WXAUub4IVtqAQrd@cluster0.b0inasj.mongodb.net/`
  )
  .then(() =>
    app.listen(5000, () =>
      console.log("Connected To Database And Server is running")
    )
  )
  .catch((e) => console.log(e));





  
