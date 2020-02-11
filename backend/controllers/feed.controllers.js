import { Post } from '../models/Post'
import { User } from '../models/User'

export const getAllPosts = (req, res, next) => {
    // Pagination
    const currentPage = req.query.page || 1
    const perPage = 12
    let totalItems;

    Post.find()
    .countDocuments()
    .then(count => {
        totalItems = count
        return Post.find()
        .skip((currentPage - 1 ) * perPage)
        .limit(perPage)        
    })
    .then(posts => {
        res
        .status(200)
        .json({
            message: 'Fetched Posts Successfully',
            posts,
            totalItems
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const savePost = (req, res, next) => {
    const title = req.body.title
    const content = req.body.content

    let creator 

    const post = new Post({
        title: title,
        content: content,
        creator: req.userId
    })

    post
    .save()
    .then(result => {
        return User.findById(req.userId)
    }).then(user => {
        creator = user
        user.posts.push(post)
        return user.save()
    }).then(result =>{
        res.status(201).json({
            message: 'Post created successfully!',
            post: post,
            creator: { 
                _id: creator._id, 
                name: creator.name 
            }
        });
    })
    .catch(err => {
        console.log(err)
    })  
}

export const getOnePost = (req, res, next) => {
    const postId = req.params.postId
    Post
    .findById(postId)
    .then(post => {
        if(!post) {
            const error = new Error('Could not find post.')
            error.statusCode = 404
            throw error
        }
        res.status(200)
        .json({
            message: 'Post Fetched',
            post: post
        })
    })
    .catch(err => {
        console.log(err)
    })
}

export const updatePost = (req, res, next) => {
    const postId = req.params.postId
    const title = req.body.title
    const content = req.body.content

    Post.findById(postId)
    .then(post => {
        if (!post) {
            const error = new Error('Could not find post.')
            error.statusCode = 404
            throw error
        }
        if (post.creator.toString() !== req.userId) {
            console.log('not authorized')
            const error = new Error('Not Authorized')
            error.statusCode = 403
            throw error
        }

        post.title = title
        post.content = content
        return post.save()
    })
    .then(result => {
        res.status(200)
        .json({
            message: 'Post updated.',
            post: result
        })
    })
    .catch(err => {

    })
}

export const deleteOnePost = (req, res, next) => {
    const postId = req.params.postId
    
    Post.findById(postId)
    .then(post =>{
        //Check to make sure a post exists
        if (!post ) {
            const error = new Error('Could not find post')
            error.statusCode = 404
            throw error
        }
        //Check to see if the user trying to delete is the same user who created the post
        if (post.creator.toString() !== req.userId) {
            console.log('not authorized')
            const error = new Error('Not Authorized')
            error.statusCode = 403
            throw error
        }
        //check logged in user
        return Post.findByIdAndRemove(postId, { useFindAndModify: false })
    })
    .then(result => {
        // Clear the relation between the post and the user
        return User.findById(req.userId)
        
    })
    .then(user => {
        user.posts.pull(postId)
        return user.save()        
    })
    .then(result => {
        res.status(200).json({
            message: 'Deleted post.'
        })
    })
    .catch(err => {
        console.log(err)
    })
}