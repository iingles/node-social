import { Router } from 'express'
import { body } from 'express-validator'

//Token authorization
import { isAuth } from '../middleware/is-auth'

// Controllers
import { getAllPosts, savePost, getOnePost, updatePost, deleteOnePost } from '../controllers/feed.controllers'

export const feedRouter = Router()

/*
    Path: /feed/posts
*/

// Get all posts
feedRouter.get('/posts', isAuth, getAllPosts)

// Save a new post
feedRouter.post('/posts', 
isAuth,
[
    // Validation
    
    body('title')
        .trim()
        .isLength({ min: 5 }),
    body('content')
        .trim()
        .isLength({ min: 5 })

], savePost)


/*
    Path: /feed/post/:postId
*/

// For a single post
feedRouter.get('/post/:postId', isAuth, getOnePost)

//Updating a post
feedRouter.put(
    '/post/:postId', 
    isAuth, 
    [
        body('title')
        .trim(),
        body('content')
        .trim()
    ],
updatePost
)

/*
    Path: /feed/post/:postId
*/

// Delete a single post
feedRouter.delete('/post/:postId', isAuth, deleteOnePost)
