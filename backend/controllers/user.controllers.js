import { User } from '../models/User'

export const getProfile = (req, res, next) => {
    const userId = req.params.userId

    User.findById(userId)
        .then(user => { 
            //IF the user doesn't exist, throw an error
            if(!user) {
                const error = new Error('That user doesn\'t exist.')
                error.statusCode = 401
                throw error
            }
            
            //If the user exists, respond with the relevant info
            res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                status: user.status,
                bio: user.bio,
                following: user.following,
                followers: user.followers,
                profileImageUrl: user.profileImageUrl
            })

        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}