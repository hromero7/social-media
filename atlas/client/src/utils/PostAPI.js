export default {
    getPosts: () => {
        return fetch('view/posts', {
            method: "get",
            body: JSON.stringify(),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
          .then(data => data);
            
        
    }
}