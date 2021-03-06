import mongoose from 'mongoose';

const tutorSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true,
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
        degree: {
            type: String,
            required: true,
        },
        result: {
            type: String,
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

const Tutor = mongoose.model('Tutor', tutorSchema);

export default Tutor;