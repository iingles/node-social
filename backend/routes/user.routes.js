import { Router } from 'express'
import { body } from 'express-validator'

//Token authorization
import { isAuth } from '../middleware/is-auth'

//Controllers
import { getProfile, updateProfile, updateFollowings, getFollowings } from '../controllers/user.controllers'

export const userRouter = Router()

/*
    Route: user/profile
*/

userRouter.get('/profile/:userId', isAuth, getProfile)

userRouter.put('/profile/update/:userId', isAuth, updateProfile)

/*
    Route: user/getFollowings/:id
*/

userRouter.get('/getFollowings/:id', isAuth, getFollowings)

/*
    Route: user/profile/updateFollowers
*/

userRouter.patch('/profile/updateFollowers', isAuth, updateFollowings)