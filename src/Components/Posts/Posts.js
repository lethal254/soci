import React, { useEffect, useReducer } from "react";
import { database } from "../../firebase";
import Post from "../Post/Post";
import postsStyles from "./Posts.module.css";
import PostsReducer from "../../Reducers/PostsReducer";

function Posts({ searchTerm }) {
  const [myPosts, dispatch] = useReducer(PostsReducer, []);
  useEffect(() => {
    database.ref("feed").on("value", (snapshot) => {
      const posts = [];

      snapshot.forEach((childSnapshot) => {
        posts.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      dispatch({
        type: "POPULATE_POSTS",
        posts: posts,
      });
    });
  }, []);

  return (
    <div className={postsStyles.posts}>
      {console.log(myPosts)}
      {myPosts
        .filter((post) => post.caption.includes(searchTerm))
        .sort((a, b) => {
          if (a.timestamp > b.timestamp) {
            return -1;
          } else {
            return 1;
          }
        })
        .map((post) => {
          return (
            <Post
              key={post.id}
              id={post.id}
              caption={post.caption}
              imageUrl={post.imageUrl}
              myUser={post.user}
              date={post.date}
              likes={post.likes}
              liked={post.liked}
            />
          );
        })}
    </div>
  );
}

export default Posts;
