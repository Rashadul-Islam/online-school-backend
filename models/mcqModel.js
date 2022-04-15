import mongoose from 'mongoose';

const mcqSchema = mongoose.Schema(
    {
        user: {
            type: String,
            required: true
        },
        courseId: {
            type: String,
            required: true
        },
        questions: {
            type: Array,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const MCQ = mongoose.model('MCQ', mcqSchema);

export default MCQ;