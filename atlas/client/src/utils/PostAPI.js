export default {
    getPosts: () => {
        return fetch('/view/allposts', {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
            
        
    },
    getMyPosts: () => {
        return fetch('/view/myposts', {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    },
    getSinglePost: (postId) => {
        return fetch('/view/post/' + postId, {
            method: 'get',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data); 
    },
    createPost: (post) => {
        return fetch('/view/post', {
            method: 'post',
            body: JSON.stringify(post),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    },
    postComment: (postId, comment) => {
        return fetch('/view/addcomment/' + postId, {
            method: 'put',
            body: JSON.stringify(comment),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    },
    likePost: (postId) => {
        return fetch('/view/likes/' + postId, {
            method: 'put',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data); 
    },
    removeLike: (postId, likeId) => {
        return fetch('/view/deletelike/' + postId + '/' + likeId, {
            method: 'delete',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data)
    },
    likeComment: (postId, commentId) => {
        return fetch('/view/likecomment/' + postId + '/' + commentId, {
            method: 'put',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data)
    },
    removeCommentLike: (postId, commentId, likeId) => {
        return fetch('/view/deletecommentlike/' + postId + '/' + commentId + '/' + likeId, {
            method: 'delete',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data)
    },
    deletePost: (postId) => {
        return fetch('/view/deletepost/' + postId, {
            method: 'delete',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    },
    deleteComment: (postId, commentId) => {
        return fetch('/view/deletecomment/' + postId + '/' + commentId, {
            method: 'delete',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    }
}