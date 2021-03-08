// import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import NewPost from "./NewPost";
import Post from "./Post";
import Home from "./Home";

function Routes() {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/new">
          <NewPost />
        </Route>
        <Route exact path="/:postId">
          <Post />
        </Route>
        <Route>
          <p>Page not found.</p>
        </Route>
      </Switch>
    </>
  );
}

export default Routes;
