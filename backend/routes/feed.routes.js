import { Router } from 'express'
import { getAllPosts, savePost, getOnePost, updatePost, deleteOnePost } from '../controllers/feed.controllers'

export const feedRouter = Router()

/*
    Path: /feed/posts
*/

// Get all posts
feedRouter.get('/posts', getAllPosts)

// Save a new post
feedRouter.post('/posts', savePost)


/*
    Path: /feed/post/:postId
*/

// For a single post
feedRouter.get('/post/:postId', getOnePost)

//Updating a post
feedRouter.put('/post/:postId', updatePost)


/*
    Path: /feed/deletePost
*/

// Delete a single post
feedRouter.post('/deletePost/:postId,', deleteOnePost)