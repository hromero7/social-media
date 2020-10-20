const router = require("express").Router();
let User = require("../models/user");

router.get("/", (req, res) => {
   res.json({works: "good"})
});

router.post("/login", (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    User.findOne({username: username, password: password}, (err, user) => {
        if (err) {
            return res.status(500).send();
        }
        if(!user) {
            return res.status(404).send();
        }
        return res.status(200).send();
    })

});

router.post("/register", (req, res) => {
    let newUser = new User ();
    newUser.firstName = req.body.firstName;
    newUser.lastName = req.body.lastName;
    newUser.email = req.body.email;
    newUser.username = req.body.username;
    newUser.password = req.body.password;

    newUser.save((err, savedUser) => {
        if (err) {
            return res.status(500).send();
        }
        return res.status(200).send();
    });

})

module.exports = router;



