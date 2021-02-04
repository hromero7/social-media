const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const UserSchema = new Schema ({  
firstName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    trim: true,
    required: true
},
lastName: {
    type: String,
    minlength: 2,
    maxlength: 30,
    trim: true,
    required: true
},
email: {
    type: String,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    required: true
},
username: {
    type: String,
    minlength: 3,
    maxlength: 30,
    trim: true,
    unique: true,
    required: true
},
password: {
    type: String,
    trim: true,
    required: true
},
avatar: {
    type: String,
    default: "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"
    // default: "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
},
bio: {
    type: String,
    maxlength: 250,
    trim: true,
    default: "Welcome to my profile!"
},
followers: [
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
],
following: [
    {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    }
]
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