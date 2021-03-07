import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NewPost from "./NewPost";
import Post from "./Post";
import Home from "./Home";
import PostContext from "./PostContext";
import { nanoid } from "nanoid";

function Routes() {
  const [posts, setPosts] = useState({});

  function addPost(data) {
    let id = nanoid();
    setPosts({ ...posts, [id]: data });
  }

  function removePost(id) {
    let filteredPosts = { ...posts };
    delete filteredPosts[id];
    setPosts({ ...filteredPosts });
  }

  function editPost(id, data) {
    setPosts({ ...posts, [id]: data });
  }

  return (
    <PostContext.Provider value={{ posts, addPost, editPost }}>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/new">
          <NewPost />
        </Route>
        <Route exact path="/:postId">
          <Post remove={removePost} />
        </Route>
        <Route>
          <p>Page not found.</p>
        </Route>
      </Switch>
    </PostContext.Provider>
  );
}

export default Routes;
