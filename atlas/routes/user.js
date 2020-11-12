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

router.post("/login", passport.authenticate("local", { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username } = req.user;
        const token = signToken(_id);
        res.cookie("access_token", token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username } });
    }
    
    
    // let username = req.body.username;
    // let password = req.body.password;

    // User.findOne({username: username, password: password}, (err, user) => {
    //     if (err) {
    //         return res.status(500).send();
    //     }
    //     if(!user) {
    //         return res.status(404).send();
    //     }
    //     return res.status(200).send();
    // })

});

router.post("/register", (req, res) => {
    let username = req.body.username;

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

            newUser.save((err, savedUser) => {
                if (err) {
                    return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
        }
                return res.status(200).json( { message: { msgBody: "Account successfully created", msgError: false }});
    });
        }
    });

})

router.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.clearCookie("access_token");
    res.json({ user: { username: "" }, success: true });
});

router.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res) => {
    let { username } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username }});
});

module.exports = router;



