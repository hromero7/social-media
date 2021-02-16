const router = require("express").Router();
const passport = require("passport");
const User = require("../models/user");
let Post = require("../models/posts");


router.get("/", (req, res) => {
  res.json({ works: "good" });
});

//get all posts from all users
router.get("/allposts", passport.authenticate("jwt", { session: false}), (req, res) => {
  Post.find({}, function (err, docs) {
      if (err) {
        res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
      } else {
        res.status(200).json(docs);
      }
  }).sort({ date: -1 });
});

//get user post 
router.get("/userpost/:user_id", passport.authenticate("jwt", { session: false}), (req, res) => {
  Post.find({ userId: req.params.user_id }, (err, posts) => {
    if (!posts) {
      return res.status(404).json({ message: { msgBody: "No posts", msgError: true }});
    }
    if(err) {
      return res.status(500).json({message: { msgBody: "Error has occured", msgError: true }});
     } else {
      return res.status(200).json({posts: posts, authenticated : true});
      }
    }).sort({ date: -1 });
  });

//get single post
router.get("/post/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (!post) {
      return res.status(404).json("Post not found");
    }
    if(err) {
      return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
    } else {
      res.status(200).json(post);
    }
  });
});

//create post route
router.post("/post", passport.authenticate("jwt", { session: false }), (req, res) => {
  let { body } = req.body;
    User.findById(req.user.id, (err, user) => {
      if (!user) {
        return res.status(404).json("User not found");
      } else {
        let newPost = new Post({
          body,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          avatar: user.avatar,
          userId: req.user.id,
        });
    
         newPost.save((err, post) => {
           if (err) {
            return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
           }
           return res.status(200).json({ message: { msgBody: "Post successfully created.", msgError: false }});
         });
      }

    });
});

// get user specific posts
router.get("/myposts", passport.authenticate("jwt", { session: false }), (req, res) => {
    Post.find({userId: req.user._id}, (err, posts) => {
      if(err)
      res.status(500).json({message: { msgBody: "Error has occured", msgError: true }});
      else {
      res.status(200).json({posts: posts, authenticated : true});
      }
    }).sort({ date: -1 });
  });

//get user's following posts 
router.get("/posts/following", passport.authenticate("jwt", { session: false }), (req, res) => {
  let id = req.user.following.map(following => {
    return following.id
  })
  Post.find({userId: id}, (err, posts) => {
    if(err)
      res.status(500).json({message: { msgBody: "Error has occured", msgError: true }});
      else {
      res.status(200).json(posts);
      }
}).sort({ date: -1 });
});
  //add comment 
  router.put("/addcomment/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
    let { body } = req.body;
    Post.findById(req.params.post_id, (err, post) => {
      User.findById(req.user.id, (err, user) => {
        if (!post) {
          return res.status(404).json({ message: { msgBody: "No post found", msgError: true }});
        }
        if (!user) {
          return res.status(404).json({ message: { msgBody: "No user found", msgError: true }});
        } else {
          let newComment = {
            body,
            firstName: req.user.firstName,
            lastName: req.user.lastName,
            username: req.user.username,
            avatar: req.user.avatar,
            userId: req.user.id
          }
      
          post.comments.unshift(newComment);
      
          post.save((err, post) => {
            if (err) {
              return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
            } else {
              return res.status(200).json({ message: { msgBody: "Comment successfully created.", msgError: false }});
            }
          });
        }
      })
    });
  });

  // add like to post
router.put("/likes/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (!post) {
      return res.status(404).json({ message: { msgBody: "Post not found", msgError: true }});
    }
    //users can only like post once
    if (post.likes.find((like) => like.id.toString() === req.user.id)) {
      return res.status(401).json({ message: { msgBody: "You have already liked this post", msgError: true }});
    } else {
      let newLike = {
        id: req.user.id
      };
      post.likes.unshift(newLike);

      post.save((err, post) => {
        if (err) {
          return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
        } else {
          return res.status(200).json({post: post, message: { msgBody: "Post liked", msgError: false }});
        };
      });
    };
  });
});

//add like to comment 
router.put("/likecomment/:post_id/:comment_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (!post) {
      return res.status(404).json({ message: { msgBody: "Post not found", msgError: true }});
    }
    //function to find comment
    const commentFromPost = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id.toString()
    );
    //users can only like a comment once
    if (commentFromPost.likes.find((likes) => likes.id.toString() === req.user.id.toString())) {
      return res.status(401).json({ message: { msgBody: "You have already liked this comment", msgError: true }});
    }

    if (!commentFromPost) {
      return res.status(404).json({ message: { msgBody: "Comment not found", msgError: true }});
    } else {
      let newLike = {
        id: req.user.id
      };
      commentFromPost.likes.unshift(newLike);

      post.save((err, post) => {
        if (err) {
          return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
        } else {
          return res.status(200).json({post: post, message: { msgBody: "Comment liked", msgError: false }});
        };
      });
    };
  });
});

// delete post route
router.delete("/deletepost/:post_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (!post) {
      return res.status(404).json({ message: { msgBody: "Post not found", msgError: true }});
    }
    //users can only delete their own posts
    if (post.userId.toString() !== req.user.id.toString()) {
      return res.status(401).json({ message: { msgBody: "Not authorized", msgError: true }});
    }
    else {
      post.remove(err => {
        if (err) {
          return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
        } else {
          return res.status(200).json({message: { msgBody: "Post successfully deleted", msgError: false }});
        }
      });
    }

  });
});

//delete comment from post route
router.delete("/deletecomment/:post_id/:comment_id", passport.authenticate("jwt", { session: false}), (req, res) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (!post) {
      return res.status(404).json({ message: { msgBody: "Post not found", msgError: true }});
    }
    //function to find comment
    const commentFromPost = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id.toString()
    );
    //users can only delete their own comments
    if (commentFromPost.username.toString() !== req.user.username.toString()) {
      return res.status(401).json({ message: { msgBody: "Not authorized", msgError: true }});
    }
    //filter out comment that is being deleted
    const removeComment = post.comments.filter(
      (comment) => comment._id.toString() !== req.params.comment_id
      );

      post.comments = removeComment;

      post.save((err, post) => {
        if (err) {
          return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
        } else {
          return res.status(200).json({post: post, message: { msgBody: "Comment successfully deleted", msgError: false }}); 
        }
      });
  });
});

//remove like from post 
router.delete("/deletelike/:post_id/:like_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (!post) {
      return res.status(404).json({ message: { msgBody: "Post not found", msgError: true }});
    }

    const removeLike = post.likes.filter(
      (like) => like._id.toString() !== req.params.like_id.toString()
    );

    post.likes = removeLike;

    post.save((err, post) => {
      if (err) {
        return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
      } else {
        return res.status(200).json({post: post, message: { msgBody: "Like successfully deleted", msgError: false }}); 
      }
    });
  });
});

//remove like from comment
router.delete("/deletecommentlike/:post_id/:comment_id/:like_id", passport.authenticate("jwt", { session: false }), (req, res) => {
  Post.findById(req.params.post_id, (err, post) => {
    if (!post) {
      return res.status(404).json({ message: { msgBody: "Post not found", msgError: true }});
    }
    const comment = post.comments.find(
      (comment) => comment._id.toString() === req.params.comment_id.toString()
    );
    const removeLike = comment.likes.filter(
      (like) => like._id.toString() !== req.params.like_id.toString()
    );

    comment.likes = removeLike;

    post.save((err, post) => {
      if (err) {
        return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true }});
      } else {
        return res.status(200).json({post: post, message: { msgBody: "Like successfully deleted", msgError: false }}); 
      }
    });
  });
});

module.exports = router;
