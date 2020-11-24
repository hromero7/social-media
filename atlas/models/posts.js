const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    avatar: {
        type: String

    },
    body: {
        type: String,
        required: true,
    },
    date: { type: Date, default: Date.now() },
    likes: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        }
    ],
    comments: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            firstName: {
                type: String,
                required: true
            },
            lastName: {
                type: String,
                required: true
            },
            username: {
                type: String,
            },
            avatar: {
                type: String
            },
            body: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now()
            },
            likes: [
                {
                    id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                    }
                }
            ]
        }
    ]
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;