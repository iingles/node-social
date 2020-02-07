import { User } from '../models/User'

export const getCreateUser = (req, res, next) => {
        
}

export const postCreateUser = (req, res, next) => {
    let email = req.body.email

    User.findOne(email)
    .then(user => {
        //check to see if the user already exists
        if(user) {
            console.log('email already being used')
            return res.redirect('/')
        }
        console.log('email is not being used')
    })
}

export const getUserProfile = (req, res, next) => {

}

export const postUserProfile = (req, res, next) => {

}