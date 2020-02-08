import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

import { User } from '../models/User'


export const putSignUp = (req, res, next) => {
    const errors = validationResult(req)

    // Error handling
    if(!errors.isEmpty()) {
        const error = new Error('Validation failed.')
        error.statusCode = 422
        error.data = errors.array();
        throw error
    }

    const email = req.body.email
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const password = req.body.password
    
    bcrypt
    .hash(password, 12)
    .then(hashedPw => {
        const user = new User({
            email,
            firstName,
            lastName,
            password: hashedPw
        })        
        return user.save()
    })
    .then(result => {
        console.log('Successfully created user!')
        res.status(201).json({
            message: 'User Created!',
            userId: result._id
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}