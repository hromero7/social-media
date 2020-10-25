const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const jwtStrategy = require("passport-jwt").Strategy;
const User = require("../models/user");

const cookieExtractor = req => {
    let token;
    if (req && req.cookies) {
        token = req.cookies["access_token"];
    }
    return token;
}

// authorization 
passport.use(new jwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "socialbug"
}, (payload, done) => {
    User.findById({_id: payload.sub}, (err, user) => {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, done);
        }
    });
}));

// authenicating using username and password
passport.use(new localStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
        if (err) {
            return done(err);
        }
        // no user exists
        if (!user) {
            return done(null, false);
        }
        // validate password credentials
        user.comparePassword(password, done);
    });
}));