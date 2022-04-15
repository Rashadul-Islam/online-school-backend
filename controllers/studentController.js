import asyncHandler from "express-async-handler";
import Student from "../models/studentModel.js";
import fs from "fs-extra";

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

const profileEdit = asyncHandler(async (req, res) => {
    const { photo } = req.files;
    const { name, gender, phone, birthDate, address, nationality, classLevel, roll, institute, deleted } = req.body;

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

    const student = await Student.findOneAndUpdate(
        { user: req.params.id },
        {
            $set: {
                name: name,
                gender: gender,
                phone: phone,
                birthDate: birthDate,
                address: address,
                nationality: nationality,
                classLevel: classLevel,
                roll: roll,
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


const allStudent = asyncHandler(async (req, res) => {

    const student = await Student.find({})

    if (student) {
        res.status(201).json({
            student
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
});

export { createStudent, getStudent, profileEdit, allStudent };
