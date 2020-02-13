import { Router } from 'express'
import { body } from 'express-validator'

//Token authorization
import { isAuth } from '../middleware/is-auth'

//Controllers
import { getProfile, updateProfile } from '../controllers/user.controllers'

export const userRouter = Router()

userRouter.get('/profile/:userId', isAuth, getProfile)

userRouter.put('/profile/:userId', isAuth, updateProfile)