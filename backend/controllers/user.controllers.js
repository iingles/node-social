import { User } from '../models/User'

export const getProfile = async (req, res, next) => {
    const userId = req.params.userId
    
    User.findById(userId)
        .populate('posts')
        .then(user => { 
            //IF the user doesn't exist, throw an error
            if(!user) {
                const error = new Error('That user doesn\'t exist.')
                error.statusCode = 401
                throw error
            }
            
            User.findById(userId).populate('posts')

            res.status(200).json({
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email,
                status: user.status,
                bio: user.bio,
                following: user.following,
                followers: user.followers,
                profileImageUrl: user.profileImageUrl,
                posts: user.posts
            })
        })
        .catch(err => {
            if(!err.statusCode) {
                err.statusCode = 500
            }
            next(err)
        })
}

export const updateProfile = (req, res, next) => {
    const userId = req.params.userId
    const currUser = req.body.user

    User.findById(userId)
    .then(user => {
        if(!user) {
            const error = new Error('Could not find post.')
            error.statusCode = 404
            throw error
        }
        //Have to figure out how to do this better
        if (req.params.userId !== user._id) {
            console.log('not authorized')
            const error = new Error('Not Authorized')
            error.statusCode = 403
            throw error
        }
        //Update the user
        user.bio = currUser.bio
        user.status = currUser.status
        user.profileImageUrl = currUser.profileImageUrl
        return user.save()
    })
    .then(result => {
        res.status(200)
        .json({
            message: 'User profile updated.',
            user: result
        })
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })
}