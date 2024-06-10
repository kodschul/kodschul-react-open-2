import { useEffect, useState } from "react";

const PostApp = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const fetchPosts = () => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((posts) => setPosts(posts));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const createPost = () => {
    if (!title || !message) {
      console.log("Bitte felder ausfüllen");
      return;
    }

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({ title: title, body: message, userId: 1 }),
    })
      .then((res) => {
        console.log("Post erstellt!", res);
        fetchPosts();
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <div style={styles.main}>
      <h1>Post App</h1>

      <input
        type="text"
        value={title}
        placeholder="Enter post title"
        style={{ background: "transparent", color: "white", width: 500 }}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        value={message}
        placeholder="Enter post message"
        style={{ background: "transparent", color: "white", width: 500 }}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={createPost}>Add post</button>
      <button onClick={fetchPosts}>Fetch posts</button>

      <hr />
      {posts.map((post, i) => (
        <div
          key={i.toString()}
          style={{
            margin: 10,
            ...(i % 2 && { background: "green", color: "white" }),
          }}
        >
          {post.title}
        </div>
      ))}
    </div>
  );
};

const styles: any = {
  main: {
    minHeight: "100vh",
    width: "100vqw",
    color: "white",
    background: "rgb(0, 0, 46)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
};

export default PostApp;
