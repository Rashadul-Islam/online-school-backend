import mongoose from 'mongoose';

const studentSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        birthDate: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true
        },
        nationality: {
            type: String,
            required: true,
        },
        classLevel: {
            type: String,
            required: true,
        },
        roll: {
            type: Number,
            required: true,
        },
        institute: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const Student = mongoose.model('Student', studentSchema);

export default Student;