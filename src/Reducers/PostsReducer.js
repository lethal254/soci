const PostsReducer = (state, action) => {
  switch (action.type) {
    case "POPULATE_POSTS":
      return action.posts;
  }
};
export default PostsReducer;
