import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const protect = asyncHandler(async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.JWT_SECRET)

      req.user = await User.findById(decoded.id).select('-password')
      if (req.user.ban === 0) {
        next()
      }
      else {
        res.status(401)
        throw new Error('Not authorized')
      }
    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized, token failed')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized')
  }
})

const check = asyncHandler(async (req, res, next) => {

  if (req.body.email && req.body.password) {
    try {

      const user = await User.findOne({ email: req.body.email })
      if (user.ban === 0) {
        next()
      }
      else {
        res.status(401)
        throw new Error('Not authorized')
      }

    } catch (error) {
      console.error(error)
      res.status(401)
      throw new Error('Not authorized')
    }
  }
})


export { protect, check }
