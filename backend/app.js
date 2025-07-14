import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import fileUpload from "express-fileupload";
import userRouter from "./routes/userRouter.js";
import jobRouter from "./routes/jobRouter.js";
import applicationRouter from "./routes/applicationRouter.js";



const app = express();
config({ path: "./config/config.env" });

app.use(
  cors({
    origin: ["https://t-y-website-tlz7.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","https://t-y-website-tlz7.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    
    next();
  });




app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use("/api/v1/user", userRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

// newsLetterCron()



app.use(errorMiddleware);

export default app;
