import { Router } from 'express'
import { geCreateUser, postCreateUser } from '../controllers/user.controllers'

export const userRouter = Router()

/*
    Path: /user/create
*/

userRouter.get('/create', getCreateUser)
userRouter.post('/create', postCreateUser)

/*
    Path: /user/profile
*/

userRouter.get('/profile', getUserProfile)
userRouter.post('/profile', postUserProfile)