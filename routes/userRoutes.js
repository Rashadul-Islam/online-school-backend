import express from 'express'
const router = express.Router()
import {
  authUser,
  registerUser
} from '../controllers/userController.js'
import { check } from '../middleware/authMiddleware.js'

router.route('/').post(registerUser)
router.post('/login', check, authUser)


export default router;
