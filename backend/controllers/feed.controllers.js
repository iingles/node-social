import { Post } from '../models/Post'

export const getAllPosts = (req, res, next) => {
    Post.find()
    .then(posts => {
        res.status(200).json({
            message: 'Fetched Posts Successfully',
            posts:posts
        })
    }).catch(err => {
        console.log(err)
    })
}