import asyncHandler from "express-async-handler";
import Course from "../models/courseModel.js";

const createCourse = asyncHandler(async (req, res) => {
    const {
        user,
        title,
        classLevel,
        topic,
        start,
        time,
        about
    } = req.body;
    const course = await Course.create({
        user,
        title,
        classLevel: parseInt(classLevel),
        topic,
        start,
        time,
        about
    })

    if (course) {
        res.status(201).json({
            success: true
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

const allCourse = asyncHandler(async (req, res) => {
    const course = await Course.find({ user: req.params.id })

    if (course) {
        res.status(201).json({
            course
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

const totalCourse = asyncHandler(async (req, res) => {
    const course = await Course.find({})

    if (course) {
        res.status(201).json({
            course
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});


export { createCourse, allCourse, totalCourse };
