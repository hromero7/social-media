import React, { useState, useEffect } from "react";
import ProfileCard from "../../components/ProfileCard";
import PostCard from "../../components/PostCard";
import Comment from "../../components/Comment";
import PostAPI from "../../utils/PostAPI";

const Post = (props) => {
    // console.log(props.match.params.id)
    const [post,setPost] = useState({});
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState([]);
    const [newComment, setNewComment] = useState({ body: "" });

    useEffect(() => {
        PostAPI.getSinglePost(props.match.params.id).then(data => {
          setPost(data);
          setComments(data.comments)
          setLikes(data.likes);
          console.log(data);

        })
      },[])

    const resetCommentForm = () => {
        setNewComment({ body: "" });
    }

    const handleChange = (e) => {
       setNewComment({ [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        PostAPI.postComment(post._id, newComment).then(res => {
            PostAPI.getSinglePost(props.match.params.id).then(data => {
                setComments(data.comments);
                resetCommentForm();
            });
        });
    }
    return (

        <div className="container dashboard">
        
        <div>
            <ProfileCard/>
        </div>
        
        <div className="feed">
        <PostCard
                body={post.body}
                user={post.username}
                comments={comments}
                likes={likes}
                postId={post._id}
                userId={post.userId}
                /> 
        <div>
            <form className="form-group" onSubmit={handleSubmit}>
                <input type="text" className="form-control" placeholder="Add a comment..." name="body" value={newComment.body} onChange={handleChange}/>
                <button type="submit" className="btn btn-primary">Post</button>
            </form>
        </div>
        {
            comments.map((comment, i) => {
                return <Comment
                    key={i} 
                    body={comment.body}
                    user={comment.username}
                    likes={comment.likes}
                    commentId={comment._id}
                    />
            })
        }
        </div>

        </div>
    )
}

export default Post;