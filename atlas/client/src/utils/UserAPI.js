export default {
    login: function(user) {
        return fetch("http://localhost:3001/user/login", {
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

    register: function(user) {
        return fetch("http://localhost:3001/user/register", {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
    },

    logout: function() {
        return fetch("http://localhost:3001/user/logout")
                    .then(res => res.json())
                    .then(data => data)
    },

    isAuthenticated: () => {
        return fetch("http://localhost:3001/user/authenticated")
                        .then(res => {
                            if (res.status !== 401) {
                                return res.json().then(data => data);
                            } else {
                                return { isAuthenticated: false, user: { username: "" } }
                            }
                        });
    }
}