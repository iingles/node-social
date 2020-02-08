import mongoose from 'mongoose'

const Schema = mongoose.Schema

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'I am new'
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post' 
        }
    ]
})

export const User = mongoose.model('User', userSchema)