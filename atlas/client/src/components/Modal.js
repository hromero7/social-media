import React, { useState, useContext } from "react";
import PostAPI from "../utils/PostAPI";
import { PostContext } from "../context/PostContext";
import { MessageContext } from "../context/MessageContext";

const Modal = () => {
    const { posts, setPosts } = useContext(PostContext)
    const { message, setMessage } = useContext(MessageContext);
    const [newPost, setNewPost] = useState({ body: "" });
    const [charCount, setCharCount] = useState(100);

    const handleChange = (e) => {
        setNewPost({ [e.target.name]: e.target.value });
        setCharCount(100 - e.target.value.length);
    }
    
    const resetPostForm = () => {
        setNewPost({ body: "" });
        setTimeout(() => setMessage(null), 4000);
    }

    const handleClick = (e) => {
        e.preventDefault();
        PostAPI.createPost(newPost).then(res => {
            // console.log(res);
            setMessage(res);
            resetPostForm();
            PostAPI.getPosts().then(data => {
                setPosts(data);
            })
        })
    }
    return (
<div>
<button type="button" className="btn" data-toggle="modal" data-target="#exampleModal"><i className="far fa-edit"></i></button>
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Create new post</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label for="message-text" className="col-form-label">What's on your mind?</label>
            <textarea className="form-control" id="message-text" name="body" value={newPost.body} onChange={handleChange} maxLength="100"></textarea>
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <p>Characters remaining: {charCount}</p>
        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={handleClick}>Post</button>
      </div>
    </div>
  </div>
</div>
</div>
    )
}

export default Modal;