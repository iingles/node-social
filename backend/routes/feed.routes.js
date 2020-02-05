import { Router } from 'express'
import { getAllPosts, savePost, getOnePost } from '../controllers/feed.controllers'

export const feedRouter = Router()

/*
    Path: /feed/posts
*/

feedRouter.get('/posts', getAllPosts)

feedRouter.post('/posts', savePost)


/*
    Path: /feed/post/:postId
*/

feedRouter.get('/post/:postId', getOnePost)