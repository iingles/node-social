import { Router } from 'express'
import { body } from 'express-validator'

//Token authorization
import { isAuth } from '../middleware/is-auth'

//Controllers
import { getProfile, updateProfile, updateFollowings, getFollowings } from '../controllers/user.controllers'

export const userRouter = Router()
console.log('user')
userRouter.get('/profile/:userId', isAuth, getProfile)

userRouter.put('/profile/update/:userId', isAuth, updateProfile)

userRouter.get('/getFollowings/:id', isAuth, getFollowings)

userRouter.patch('/profile/updateFollowers', isAuth, updateFollowings)