import { Router } from 'express'
import { body } from 'express-validator'

import { User } from '../models/User'
import { putSignUp } from '../controllers/auth.controllers'

export const authRouter = new Router();

authRouter.put('/signup', [

    // Validation
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email')
    .custom((value, {req}) => {
        return User.findOne({
            email: value
        })
        .then(userDoc => {
            if(userDoc) {
                return Promise.reject('E-Mail address already exists')
            }
        })
    })
    .normalizeEmail(),

    body('password')
    .trim()
    .isLength({min: 5}),

    body('firstName').trim().not().isEmpty(),
    body('lastName').trim().not().isEmpty()
], putSignUp)