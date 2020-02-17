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

export const updateProfile = async (req, res, next) => {
    console.log(req)

    //This might not be the most efficient way to do this...
    const userId = req.params.userId
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let phone = req.body.phone
    let email = req.body.email
    let status = req.user.status
    let bio = req.user.bio    
    let profileImageUrl = req.body.profileImageUrl

    if (req.file) {
        profileImageUrl = req.file.path
    }
    
    try {
        const user = await User.findById(userId)

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
        // Update the user
        user.firstName = firstName
        user.lastName = lastName
        user.phone = phone
        user.email = email
        user.bio = bio
        user.status = status
        user.profileImageUrl = profileImageUrl

        const result = await user.save()

        res.status(200).json({
            message: 'User profile updated.',
            user: result
        })

    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }    
}

export const getFollowings = async (req, res, next) => {
    const userId = req.params.id
 
    try {
        const user = await User.findById(userId).populate('following').populate('followers')
        if (!user) {
            const error = new Error('Could not find user.')
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: 'Fetched followings successfully',
            following: user.following,
            followers: user.followers
        })

    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

export const updateFollowings = async (req, res, next) => {
   
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
                if(!followedUser.followers.includes(userId)) {
                    followedUser.followers.push(userId)
                }
                
                message = `User is now following ${followerId}`
            } else {
                console.log("already following that user")
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
