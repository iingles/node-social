import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

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

export const postLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password
    let loadedUser

    // Check to see if the email exists
    User.findOne({email: email})
        .then(user => {
            if(!user) {
                // If the email doesn't exist, throw an error
                const error = new Error('A user with this email could not be found.')
                error.statusCode = 401
                throw error
            }
            
            loadedUser = user
            
            //Compare hashed password to incoming password
            return bcrypt.compare(password, user.password)

        })
        .then(isEqual => {
            if(!isEqual) {
                //if the user entered an incorrect password, throw an error
                const error = new Error('Incorrect password.')
                error.statusCode = 401
                throw error
            }
            //If we make it to here, we know the user entered
            //a correct password, so issue a token

            const token = jwt.sign({
                email: loadedUser.email,
                userId: loadedUser._id.toString()
             }, 
             'somesupersecretstringcheckoutthedocsfordoingthisright',
            {
                expiresIn: '1h'
            })
            // Send a response with the token
            res.status(200).json({
                token: token,
                userId: loadedUser._id.toString()
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}