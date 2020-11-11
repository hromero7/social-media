import axios from "axios";

export default {
    login: function(user) {
        return axios.post("http://localhost:3001/user/login", user)
                    .then(res => {
                        if (res.status !== 401) {
                            return res.data;
                        } else {
                            return { isAuthenticated: false, user: { username: "" }}
                        }
                    })
    },

    register: function(user) {
        return axios.post("http://localhost:3001/user/register", user)
                    .then(res => res.json())
                    .then(data => data);
    },

    logout: function() {
        return axios.get("http://localhost:3001/user/logout")
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