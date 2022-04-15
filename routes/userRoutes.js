import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser,
  changePassword
} from '../controllers/userController.js'
import { check, protect } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', check, authUser)
router.post('/changePassword/:id', protect, changePassword)


export default router;
