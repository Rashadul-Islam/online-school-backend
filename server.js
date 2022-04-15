import path from "path";
import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import tutorRoutes from "./routes/tutorRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import mcqRoutes from "./routes/mcqRoutes.js";
import enrollRoutes from "./routes/enrollRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);
app.use(bodyParser.json());

app.use(cors());


if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tutors", tutorRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/mcqs", mcqRoutes);
app.use("/api/enrolled", enrollRoutes);


app.use("/uploads", express.static("uploads"));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
} else {
    app.get("/", (req, res) => {
        res.send("API is running....");
    });
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 9000;

app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);