const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema ({  
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
    unique: true,
    required: true
},
username: {
    type: String,
    unique: true,
    required: true
},
password: {
    type: String,
    required: true
},
posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}]
});

UserSchema.pre("save", function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    bcrypt.hash(this.password, 10, (err, hashPassword) => {
        if (err) {
            return next(err);
        }
        this.password = hashPassword;
        next();
    });
});

UserSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if (err) {
            return cb(err);
        } else if (!isMatch) {
            return cb(null, isMatch); 
        } else {
            return cb(null, this);
        }
    })
}

const User = mongoose.model("User", UserSchema);

module.exports = User;