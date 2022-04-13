import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";

const createStudent = asyncHandler(async (req, res) => {
    const {
        user,
        name,
        gender,
        phone,
        birthDate,
        address,
        nationality,
        classLevel,
        roll,
        institute,
    } = req.body;

    const { photo } = req.files;
    const student = await Student.create({
        user,
        name,
        gender,
        phone,
        birthDate,
        address,
        nationality,
        classLevel,
        roll,
        institute,
        photo: photo[0].path
    })

    if (student) {
        res.status(201).json({
            success: true
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});


const getStudent = asyncHandler(async (req, res) => {

    const student = await Student.findOne({ user: req.params.id })

    if (student) {
        res.status(201).json({
            student
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

export { createStudent, getStudent };
