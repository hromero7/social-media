const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FollowerSchema = new Schema ({  
username: {
    type: String,
    unique: true,
    required: true
},
followers: {
    type: [],
    required: false
}
});

const Follower = mongoose.model("Follower", FollowerSchema);

module.exports = Follower;