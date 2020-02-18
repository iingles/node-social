import path from 'path'
import fs from 'fs'

import { validationResult } from 'express-validator'

import { sock } from '../socket'

import { Post } from '../models/Post'
import { User } from '../models/User'


export const getAllPosts = async (req, res, next) => {
    // Pagination
    
    const userId = req.headers.userId
    const currentPage = req.query.page || 1
    const perPage = 12

    try {
        const user = await User.findById(userId)
        .populate({
            path: 'posts',
            model: 'Post',
            populate: {
                path: 'creator',
                model: 'User'
            }
        })
        .sort({ createdAt: -1 })
        .skip((currentPage - 1 ) * perPage)
        .limit(perPage)

        const posts = user.posts
        const totalItems = user.posts.length

        res.status(200).json({
            message: 'Fetched Posts Successfully',
            posts,
            totalItems
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

export const getAllUserPosts = async (req, res, next) => {
    // Pagination
    const userId = req.params.id
    const currentPage = req.query.page || 1
    const perPage = 12

    try {
        const user = await User.findById(userId)
        .populate({ 
            path: 'posts',
            model: 'Post',
            populate: {
                path: 'creator',
                model: 'User'
            }
        })
        .sort({ createdAt: -1 })
        .skip((currentPage - 1 ) * perPage)
        .limit(perPage)

        const posts = user.posts
        const totalItems = user.posts.length
        res.status(200).json({
            message: 'Fetched Posts Successfully',
            posts,
            totalItems
        })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
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
        sock.getIo().emit('posts', { 
            action: 'create', 
            post: {
                ...post._doc, 
                creator: { 
                _id: req.userId, 
                firstName: user.firstName, 
                lastName: user.lastName,
                profileImageUrl: user.profileImageUrl
            }
        } 
        })
        return user.save()
    }).then(result =>{
        res.status(201).json({
            message: 'Post created successfully!',
            post: post,
            creator: { 
                _id: creator._id, 
                name: creator.firstName 
            }
        });
    })
    .catch(err => {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })  
}

export const getOnePost = async (req, res, next) => {
    const postId = req.params.postId

    try {
        const post = await Post.findById(postId)
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
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

export const updatePost = async (req, res, next) => {
    const postId = req.params.postId
    const title = req.body.title
    const content = req.body.content
    
    try {
        const post = await Post.findById(postId).populate('creator')
        if (!post) {
            const error = new Error('Could not find post.')
            error.statusCode = 404
            throw error
        }
        if (post.creator._id.toString() !== req.userId) {
            console.log('not authorized')
            const error = new Error('Not Authorized')
            error.statusCode = 403
            throw error
        }

        post.title = title
        post.content = content
        const result = await post.save()

        sock.getIo().emit('posts', {
            action: 'update',
            post: result
        })

        res.status(200)
        .json({
            message: 'Post updated.',
            post: result
        })

    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

export const deleteOnePost = async (req, res, next) => {
    const postId = req.params.postId
    
    try {
        const post = await Post.findById(postId)

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
        await Post.findByIdAndRemove(postId, { useFindAndModify: false })

        const user = await User.findById(req.userId)
        user.posts.pull(postId)
        await user.save()
        sock.getIo().emit('posts', {
            action: 'delete',
            post: postId
        })
        res.status(200).json({ message: 'Deleted post.' })
    } catch (err) {
        if(!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}