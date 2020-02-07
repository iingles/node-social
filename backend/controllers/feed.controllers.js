import { Post } from '../models/Post'

export const getAllPosts = (req, res, next) => {
    // Pagination
    const currentPage = req.query.page || 1
    const perPage = 2
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

    const post = new Post({
        title: title,
        content: content,
        creator: { name: 'Isaac' }
    })

    post
    .save()
    .then(result => {
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
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
        //check logged in user
        return Post.findByIdAndRemove(postId, { useFindAndModify: false })
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