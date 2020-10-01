const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const FollowingSchema = new Schema ({  
username: {
    type: String,
    unique: true,
    required: true
},
following: {
    type: [],
    required: false
}
});

const Following = mongoose.model("Following", FollowingSchema);

module.exports = Following;