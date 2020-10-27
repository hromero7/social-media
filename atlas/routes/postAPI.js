const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
let Post = require("../models/posts");


router.get("/", (req, res) => {
  res.json({ works: "good" });
});

router.post("/post", passport.authenticate("jwt", { session: false }), (req, res) => {
    const post = new Post(req.body);
    post.save((err) => {
      if (err)
        res
          .status(500)
          .json({ message: { msgBody: "Error has occured", msgError: true } });
      else {
        req.user.posts.push(post);
        req.user.save((err) => {
          if (err)
            res.status(500).json({
              message: { msgBody: "Error has occured", msgError: true },
            });
          else
            res.status(200).json({
              message: {
                msgBody: "Successfully created post",
                msgError: false,
              },
            });
        });
      }
    });
  }
);

router.post("/posts", passport.authenticate("jwt", { session: false }), (req, res) => {
    User.findById({_id : req.user._id}).populate("posts").exec((err,document) => {
        if(err)
            res.status(500).json({message: { msgBody: "Error has occured", msgError: true }});
        else {
            res.status(200).json({posts: document.posts, authenticated : true});
        }
    })
  }
);

module.exports = router;
