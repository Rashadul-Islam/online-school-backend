import mongoose from 'mongoose';

const courseSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        classLevel: {
            type: Number,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        start: {
            type: String,
            required: true,
        },
        time: {
            type: String,
            required: true
        },
        about: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Course = mongoose.model('Course', courseSchema);

export default Course;