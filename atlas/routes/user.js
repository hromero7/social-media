const router = require("express").Router();
const passport = require("passport");
const passportConfig = require("../middleware/passport");
const JWT = require("jsonwebtoken");
const User = require("../models/user");

const signToken = userID => {
    return JWT.sign({
        iss: "socialbug",
        sub: userID
    }, "socialbug", { expiresIn: "2h"});
}

router.get("/", (req, res) => {
   res.json({works: "good"})
});

//get user route
router.get("/:user_id", passport.authenticate("jwt", { session: false}), (req, res) => {
    User.findById(req.params.user_id, (err, user) => {
        if (!user) {
            return res.status(404).json("Post not found"); 
        }
        if (err) {
            return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
        } else {
            return res.status(200).json(user);
        }
    }).select("-password");
});

//login route
router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username } });
    }
});

//register new user route
router.post("/register", (req, res) => {
    let username = req.body.username;
    let email = req.body.email;
    
    User.findOne({ username }, (err, user) => {
        if (err) {
            res.status(500).json({message: { msgBody: "Error has occured", msgError: true }});
        }
        if (user) {
            res.status(400).json({message: { msgBody: "Username is already taken", msgError: true }});
        } else {
            let newUser = new User ();
                newUser.firstName = req.body.firstName;
                newUser.lastName = req.body.lastName;
                newUser.email = req.body.email;
                newUser.username = req.body.username;
                newUser.password = req.body.password;
                // newUser.avatar = req.body.avatar;
            newUser.save((err, savedUser) => {
                if (err) {
                    return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
        }
                return res.status(200).json( { message: { msgBody: "Account successfully created", msgError: false }});
    });
        }
    });

});

//logout route
router.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
});
//authenicate user route
router.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
    let { username,email,_id,firstName,lastName } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username,email,_id,firstName,lastName }});
});

//following route 
router.put("/follow", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findById(req.body.followId, (err, user) => {
        if (!user) {
            return res.status(404).json({ message: { msgBody: "User not found", msgError: true }});
        }
        if (user.followers.find((follower) => follower.id.toString() === req.user._id.toString())) {
            return res.status(401).json({ message: { msgBody: "You have already followed this user!", msgError: true }});
        } else {
            let newFollow = {
                id: req.user._id
            };
            user.followers.unshift(newFollow);
            user.save((err, result) => {
                if (err) {
                    return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
                  } 
            });
            User.findById(req.user._id, (err, user) => {
                let newFollow = {
                    id: req.body.followId
                };
                user.following.unshift(newFollow);
                user.save((err, result) => {
                    if (err) {
                        return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
                      } else {
                        return res.status(200).json({ message: { msgBody: "User followed", msgError: false }});
                      };
                })
            })
        }
    })
});

//unfollow user route
router.put("/unfollow", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findById(req.body.unfollowId, (err, user) => {
        if (!user) {
            return res.status(404).json({ message: { msgBody: "User not found", msgError: true }});
        }
        const removeFollower = user.followers.filter(
            (follower) => follower.id.toString() !== req.user._id.toString()
        );

        user.followers = removeFollower;

        user.save((err, result) => {
            if (err) {
                return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
              } 
        })
    
    User.findById(req.user._id, (err, user) => {
        const removeFollower = user.following.filter(
            (following) => following.id.toString() !== req.body.unfollowId.toString()
        );

        user.following = removeFollower;

        user.save((err, result) => {
            if (err) {
                return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
              } else {
                return res.status(200).json({ message: { msgBody: "User has been unfollowed", msgError: false }});
              };
        })
    });
    });
});

module.exports = router;



