import React, { useState, useEffect, useContext } from "react";
import ProfileCard from "../../components/ProfileCard";
import PostCard from "../../components/PostCard";
import Comment from "../../components/Comment";
import PostAPI from "../../utils/PostAPI";
import { PostContext } from "../../context/PostContext";
import "./Post.css";

const Post = (props) => {
    const { singlePost, setSinglePost, likes, setLikes, comments, setComments } = useContext(PostContext);
    const [newComment, setNewComment] = useState({ body: "" });
    const [charCount, setCharCount] = useState(100);

    useEffect(() => {
        PostAPI.getSinglePost(props.match.params.id).then(data => {
          setSinglePost(data);
          setComments(data.comments)
          setLikes(data.likes);
        //   console.log(data);

        })
      },[])

    const resetCommentForm = () => {
        setNewComment({ body: "" });
    }

    const handleChange = (e) => {
       setNewComment({ [e.target.name]: e.target.value });
       setCharCount(100 - e.target.value.length);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        PostAPI.postComment(singlePost._id, newComment).then(res => {
            PostAPI.getSinglePost(props.match.params.id).then(data => {
                setComments(data.comments);
                resetCommentForm();
            });
        });
    }
    return (

        <div className="dashboard">
        
        <div>
            <ProfileCard/>
        </div>
        
        <div className="feed">
        <PostCard
                body={singlePost.body}
                avatar={singlePost.avatar}
                user={singlePost.username}
                comments={comments}
                likes={likes}
                postId={singlePost._id}
                userId={singlePost.userId}
                history={props.history}
                date={singlePost.date}
                /> 
        <div>
            <form className="form-group comment-form" onSubmit={handleSubmit}>
                <p>Characters remaining: {charCount}</p>
                <textarea type="text" className="form-control" placeholder="Add a comment..." name="body" value={newComment.body} onChange={handleChange} maxLength="100"/>
                <button type="submit" className="btn btn-primary post-btn">Post</button>
                
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
                    avatar={comment.avatar}
                    userId={comment.userId}
                    date={comment.date}
                    />
            })
        }
        </div>

        </div>
    )
}

export default Post;