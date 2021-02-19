
export default {
    login: (user) => {
        return fetch("/user/login", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => {
            if (res.status !== 401) {
                return res.json().then(data => data);
            } else {
                return { isAuthenticated: false, user: { username: "" }}
            }
        });
    },

    register: (user) => {
        return fetch("/user/register", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    },

    logout: () => {
        return fetch("/user/logout")
                    .then(res => res.json())
                    .then(data => data)
    },

    isAuthenticated: () => {
        return fetch("/user/authenticated")
                    .then(res => {
                        if (res.status !== 401) {
                            return res.json().then(data => data);
                        } else {
                            return { isAuthenticated: false, user: { username: "" } }
                        }
                        });
    },
    
    getUser: (userId) => {
        return fetch("/user/profile/" + userId, {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => data); 
    },

    getImage: (userId) => {
        return fetch("/user/image/" + userId, {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => data)
},
    uploadImage: (file) => {
        return fetch("/user/upload", {
            method: "post",
            body: file,
        }).then(res => res.json())
          .then(data => data); 
    },
    updateBio: (userId, bio) => {
        return fetch("/user/bio/" + userId, {
            method: "put",
            body: JSON.stringify(bio),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    },
    followUser: (followId) => {
        return fetch("/user/follow", {
            method: "put",
            body: JSON.stringify(followId),
            headers: {
                "Content-Type": "application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    unfollowUser: (unfollowId) => {
        return fetch("/user/unfollow", {
            method: "put",
            body: JSON.stringify(unfollowId),
            headers: {
                "Content-Type": "application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    getFollowersList: () => {
        return fetch("/user/followers/info", {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    getFollowingList: () => {
        return fetch("/user/following/info", {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    getUserFollowers: (userId) => {
        return fetch("/user/user_followers/info/" + userId, {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    },
    getUserFollowing: (userId) => {
        return fetch("/user/user_following/info/" + userId, {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            } 
        }).then(res => res.json())
          .then(data => data);
    }

}