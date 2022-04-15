import asyncHandler from "express-async-handler";
import MCQ from "../models/mcqModel.js";
import Course from "../models/courseModel.js";

const createmcq = asyncHandler(async (req, res) => {
    const { user, courseId, questions } = req.body;
    const question = await MCQ.create({
        user,
        courseId,
        questions,
    });

    if (question) {
        res.status(201).json({
            success: true,
        });
    } else {
        res.status(401);
        throw new Error("Failed to create mcq");
    }
});

const allmcq = asyncHandler(async (req, res) => {
    const mcqs = await MCQ.aggregate([
        {
            $match: {
                user: req.params.id,
            },
        },
        { $addFields: { course_Id: { $toObjectId: "$courseId" } } },
        {
            $lookup: {
                from: "courses",
                let: {
                    course: "$course_Id",
                },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$_id", "$$course"],
                            },
                        },
                    },
                ],
                as: "mcq",
            }
        },
        {
            $unwind: {
                path: "$mcq",
                preserveNullAndEmptyArrays: true,
            },
        },
    ]);

    if (mcqs) {
        res.status(201).json({
            mcqs,
        });
    } else {
        res.status(401);
        throw new Error("Failed to create course");
    }
});

export { createmcq, allmcq };
