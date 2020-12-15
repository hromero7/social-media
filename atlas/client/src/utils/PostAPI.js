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
    deletePost: (postId) => {
        return fetch('/view/deletepost/' + postId, {
            method: 'delete',
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    }
}