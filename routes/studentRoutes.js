import express from 'express'
import { createStudent, getStudent, profileEdit, allStudent } from '../controllers/studentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../middleware/upload.js';

const router = express.Router()

router.route('/').post(protect, upload.fields([{ name: "photo" }]), createStudent);
router.route('/studentProfile/:id').get(protect, getStudent);
router.route('/allstudent').get(protect, allStudent);
router.route('/profileEdit/:id').post(protect, upload.fields([{ name: "photo" }]), profileEdit);


export default router;
