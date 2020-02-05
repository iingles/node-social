import { Router } from 'express'
import { getAllPosts } from '../controllers/feed.controllers'

export const feedRouter = Router()

/*
    Path: /feed/posts
*/

feedRouter.get('/posts', getAllPosts)