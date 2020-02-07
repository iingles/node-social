import { validationResult } from 'express-validator'

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

   
}