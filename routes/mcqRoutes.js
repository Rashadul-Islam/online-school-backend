import express from 'express'
import { allmcq, createmcq } from '../controllers/mcqController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router()

router.route('/').post(protect, createmcq);
router.route('/allmcq/:id').get(protect, allmcq);


export default router;