import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";

const createTutor = asyncHandler(async (req, res) => {
    const {
        user,
        name,
        gender,
        phone,
        birthDate,
        address,
        nationality,
        degree,
        result,
        institute,
    } = req.body;

    const { photo } = req.files;
    const tutor = await Tutor.create({
        user,
        name,
        gender,
        phone,
        birthDate,
        address,
        nationality,
        degree,
        result,
        institute,
        photo: photo[0].path
    })

    if (tutor) {
        res.status(201).json({
            success: true
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});


const getTutor = asyncHandler(async (req, res) => {

    const tutor = await Tutor.findOne({ user: req.params.id })

    if (tutor) {
        res.status(201).json({
            tutor
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

export { createTutor, getTutor };
