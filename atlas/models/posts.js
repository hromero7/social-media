const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
    id: {
        type: String
        
    },
    body: {
        type: String,
        required: true,
    },
    date: { type: Date, default: Date.now },
    likes: {
        type: Number
    },
    comments: [
        {type: mongoose.Schema.Types.ObjectId,
         body: {
                
                type:String,
                datePosted: Date.now()
        }
    }
    ]
})

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;