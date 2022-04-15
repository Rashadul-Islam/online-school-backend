import express from 'express'
import { createTutor, getTutor, profileEdit, allTeacher } from '../controllers/TutorController.js'
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/upload.js';

const router = express.Router()

router.route('/').post(protect, upload.fields([{ name: "photo" }]), createTutor);
router.route('/tutorProfile/:id').get(protect, getTutor);
router.route('/allteacher').get(protect, allTeacher);
router.route('/profileEdit/:id').post(protect, upload.fields([{ name: "photo" }]), profileEdit);


export default router;
