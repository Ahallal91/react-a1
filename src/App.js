import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./components/layout/Header";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Post from "./components/post/Post";
import About from "./components/About";
import Contact from "./components/Contact";
import Navigation from "./components/layout/Navigation";
import Home from "./components/Home";
import AllPosts from "./components/post/AllPosts";
import SinglePost from "./components/post/SinglePost";
import Footer from "./components/layout/Footer";
import EditPost from "./components/post/EditPost";
import { initializeUsers, getUser, removeUser, deleteUser, updateUser } from "./data/userData";
import {
  getAllPosts,
  initializePosts,
  addPost,
  addReplyToPost,
  updatePost,
  deletePost,
  deleteReply,
  updateReply,
  deleteAllPostsRepliesByUser,
} from "./data/postData";

function App() {
  const [username, setUsername] = useState(getUser());
  const [posts, setPosts] = useState(getAllPosts());

  // gets the current logged in user and sets that to the user data.
  const setLoggedIn = () => {
    setUsername(getUser());
  };

  // sets a users data to null so they are logged out.
  const loggedOut = () => {
    setUsername(null);
    removeUser();
  };
  // updates data of a single user and then refreshes their user data.
  const updateUserData = (name, email, password, avatar) => {
    updateUser(name, email, password, avatar);
    setLoggedIn();
  };
  // updates post data on components.
  const reloadPostData = () => {
    setPosts(getAllPosts());
  };

  // adds a post and sets the post data
  const addPostData = (title, postContent, email, imageName) => {
    addPost(title, postContent, email, imageName);
    reloadPostData();
  };

  // updates a post and sets the post data
  const updatePostData = (id, title, postContent, imageName) => {
    updatePost(id, title, postContent, imageName);
    reloadPostData();
  };
  // updates a reply and sets the post data
  const updateReplyData = (replyid, content) => {
    updateReply(replyid, content);
    reloadPostData();
  };
  // adds a single reply and sets the post data
  const addReplyPostData = (postid, user, content) => {
    addReplyToPost(postid, user, content);
    reloadPostData();
  };
  // deletes a single post and sets the post data
  const deletePostData = (postid) => {
    deletePost(postid);
    reloadPostData();
  };
  // deletes a single reply and sets the post data
  const deleteReplyData = (replyid) => {
    deleteReply(replyid);
    reloadPostData();
  };

  // deletes all user data and removes their posts and replies and sets post data
  const deleteAllUserData = () => {
    deleteUser(username.email);
    deleteAllPostsRepliesByUser(username.email);
    removeUser(username.email);
    reloadPostData();
  };

  useEffect(() => {
    // initialize users from localStorage in data class.
    initializeUsers();
    // initialize posts from localStorage
    initializePosts();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Navigation user={username} loggedOut={loggedOut} />
        <Container fluid="md" className="mb-5">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/signup" render={(props) => <SignUp {...props} />}></Route>
            <Route
              path="/signin"
              render={(props) => <SignIn {...props} setLoggedIn={setLoggedIn} />}
            ></Route>
            <Route
              path="/profile"
              render={(props) => (
                <Profile
                  {...props}
                  user={username}
                  setLoggedIn={setLoggedIn}
                  loggedOut={loggedOut}
                  deleteAllUserData={deleteAllUserData}
                  deleteReplyData={deleteReplyData}
                  updateReplyData={updateReplyData}
                />
              )}
            ></Route>
            <Route
              path="/editprofile"
              render={(props) => (
                <EditProfile
                  {...props}
                  user={username}
                  loggedOut={loggedOut}
                  updateUserData={updateUserData}
                />
              )}
            ></Route>
            <Route
              path="/post"
              render={(props) => <Post {...props} user={username} addPostData={addPostData} />}
            ></Route>
            <Route
              exact
              path="/allposts"
              render={(props) => <AllPosts {...props} user={username} posts={posts} />}
            ></Route>
            <Route
              path="/allposts/:post"
              render={(props) => (
                <SinglePost
                  {...props}
                  user={username}
                  addReplyPostData={addReplyPostData}
                  deletePostData={deletePostData}
                  deleteReplyData={deleteReplyData}
                  updateReplyData={updateReplyData}
                />
              )}
            ></Route>
            <Route
              path="/editpost/:post"
              render={(props) => (
                <EditPost {...props} user={username} updatePostData={updatePostData} />
              )}
            ></Route>
            <Route path="/contact">
              <Contact />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
