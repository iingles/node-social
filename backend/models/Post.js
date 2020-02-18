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
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    stats: {
        likes: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ]
    }
    //Pass an object as a second argument to the Schema constructor
}, {
    timestamps: true
})

export const Post = mongoose.model('Post', postSchema)