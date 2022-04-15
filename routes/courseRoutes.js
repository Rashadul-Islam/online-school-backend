import express from 'express'
import { createCourse, allCourse, totalCourse } from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').post(protect, createCourse);
router.route('/allCourse/:id').get(protect, allCourse);
router.route('/totalcourse').get(protect, totalCourse);


export default router;
