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
            
            User.findById(userId)
            .populate('posts')
            .sort({createdAt: -1})

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

export const updateFollowers = async (req, res, next) => {
   
    const userId = req.body.userId
    const followerId = req.body.followerId

    //Option for add or remove follower
    const opt = req.body.opt
    let message = ''
    
    try {
        const user = await User.findById(userId)
        const followedUser = await User.findById(followerId)

        //Make sure the current user exists
        if(!user) {
            const error = new Error('Could not find user')
            error.statusCode = 404
            throw error
        }

        /* 
            If we find the user, check to see if they added or 
            removed a follower
        */

        if(opt === 'add') {
            /*
                Check to see if the user already has a follower with this 
                same ID
            */
            if(!user.following.includes(followerId)) {
                //Update both the user and the followed user's followings
                user.following.push(followerId)
                followedUser.followers.push(followerId)
                message = `User is now following ${followerId}`
            } else {
                message = `User is already following ${followerId}`
            }
        } else {
            /*
                If the option was to delete the user, remove 
                the userId from the followers
            */
            const followIdx = user.following.indexOf(followerId)
            user.following.splice(followIdx, 1)
        }

        const resultFollower = await followedUser.save()
        const resultUser = await user.save()

        res.status(200)
        .json({
            message: message,
            result: {
                resultFollower,
                resultUser
            }
        })
    } catch (err) {
        if(!err.statusCode) {
            console.log('follower error')
            err.statusCode = 500
        }
        next(err)
    }
}
