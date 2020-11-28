export default {
    getPosts: () => {
        return fetch('view/allposts', {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
            
        
    }
}