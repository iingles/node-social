import mongoose from 'mongoose'

const Schema = mongoose.Schema

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    creator: {
        type: Object,
        required: true
    }
    //Pass an object as a second argument to the Schema constructor
}, {
    timestamps: true
})

export const Post = mongoose.model('Post', postSchema)