import asyncHandler from "express-async-handler";
import Tutor from "../models/tutorModel.js";
import fs from "fs-extra";

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

const profileEdit = asyncHandler(async (req, res) => {
    const { photo } = req.files;
    const { name, gender, phone, birthDate, address, nationality, degree, result, institute, deleted } = req.body;

    if (deleted !== "") {
        //remove file from directory
        fs.remove(deleted, (err) => {
            if (err) return console.error(err);
            console.log("success!");
        });
    }

    let image;

    if (photo) {
        image = photo[0].path || req.body.photo;
    }

    const student = await Tutor.findOneAndUpdate(
        { user: req.params.id },
        {
            $set: {
                name: name,
                gender: gender,
                phone: phone,
                birthDate: birthDate,
                address: address,
                nationality: nationality,
                degree: degree,
                result: result,
                institute: institute,
                photo: image,
            },
        }
    );

    if (student) {
        res.status(201).json({
            success: true
        });
    } else {
        res.status(401);
        throw new Error("Invalid request");
    }
});

const allTeacher = asyncHandler(async (req, res) => {

    const tutor = await Tutor.find({})

    if (tutor) {
        res.status(201).json({
            tutor
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

export { createTutor, getTutor, profileEdit, allTeacher };
