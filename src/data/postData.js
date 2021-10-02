import { v4 as uuidv1 } from "uuid";

const POSTS_KEY = "posts";

// reference activity03 week5
// This class is for storing all users posts and replies to their posts. It contains methods to
// Add, Remove, Update, Get Posts and replies. It also has specific filtering methods
// to get posts or replies by a specific user.

// Checks local storage for posts object, if it exists return, otherwise initialise it.
function initializePosts() {
  if (localStorage.getItem(POSTS_KEY) !== null) {
    return;
  }

  setPosts({});
}

function setPosts(posts) {
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
}

function addPost(title, postContent, user, imageName) {
  const posts = getAllPosts();
  const uuid = uuidv1();
  const postDate = Date(Date.UTC());
  const replies = {};
  posts[uuid] = { user, title, postContent, postDate, replies, imageName };
  setPosts(posts);
}

function updatePost(postid, title, postContent, imageName) {
  const posts = getAllPosts();
  if (Object.keys(posts).includes(postid)) {
    posts[postid].title = title;
    posts[postid].postContent = postContent;
    posts[postid].imageName = imageName;
    setPosts(posts);
  }
}

function updateReply(replyid, content) {
  const posts = getAllPosts();
  Object.keys(posts).forEach((key) => {
    Object.keys(posts[key].replies).forEach((k) => {
      if (k === replyid) {
        posts[key].replies[k].content = content;
      }
    });
  });
  setPosts(posts);
}

function addReplyToPost(postid, user, content) {
  const posts = getAllPosts();
  if (Object.keys(posts).includes(postid)) {
    const uuid = uuidv1();
    const postDate = Date(Date.UTC());
    posts[postid].replies[uuid] = { user, content, postDate };
    setPosts(posts);
  }
}

function deletePost(postid) {
  const posts = getAllPosts();
  if (Object.keys(posts).includes(postid)) {
    posts[postid].deleted = true;
    delete posts[postid].user;
    delete posts[postid].postDate;
    delete posts[postid].title;
    delete posts[postid].postContent;
    delete posts[postid].imageName;
    setPosts(posts);
  }
}

// deletes all data of reply in a post of replyid that is passed in.
function deleteReply(replyid) {
  const posts = getAllPosts();
  Object.keys(posts).forEach((key) => {
    Object.keys(posts[key].replies).forEach((k) => {
      if (k === replyid) {
        posts[key].replies[k].deleted = true;
        delete posts[key].replies[k].user;
        delete posts[key].replies[k].postDate;
        delete posts[key].replies[k].content;
      }
    });
  });
  setPosts(posts);
}

function getAllPosts() {
  return JSON.parse(localStorage.getItem(POSTS_KEY));
}

function getPostById(id) {
  const posts = getAllPosts();
  return posts[id];
}

// gets a posts object of post of the user
function getPostByUser(user) {
  const posts = getAllPosts();
  const retPosts = Object.fromEntries(
    Object.entries(posts).filter(([key, value]) => value.user === user)
  );
  return retPosts;
}

// gets a filtered object of replies of the user
function getRepliesByUser(user) {
  const posts = getAllPosts();
  let retReplies = {};
  Object.keys(posts).forEach((key) => {
    Object.keys(posts[key].replies).forEach((k) => {
      if (posts[key].replies[k].user === user) {
        retReplies[k] = posts[key].replies[k];
      }
    });
  });
  return retReplies;
}

// deletes all posts and replies from a single user
// can be used in deletion of a user to ensure all their posts/replies are
// cleared.
function deleteAllPostsRepliesByUser(user) {
  const posts = getAllPosts();
  Object.keys(posts).forEach((key) => {
    if (posts[key].user === user) {
      posts[key].deleted = true;
      delete posts[key].user;
      delete posts[key].postDate;
      delete posts[key].title;
      delete posts[key].postContent;
      delete posts[key].imageName;
    }
    Object.keys(posts[key].replies).forEach((k) => {
      if (posts[key].replies[k].user === user) {
        posts[key].replies[k].deleted = true;
        delete posts[key].replies[k].user;
        delete posts[key].replies[k].postDate;
        delete posts[key].replies[k].content;
      }
    });
  });
  setPosts(posts);
}

export {
  initializePosts,
  addPost,
  deletePost,
  deleteReply,
  updatePost,
  updateReply,
  addReplyToPost,
  getAllPosts,
  getPostById,
  getPostByUser,
  getRepliesByUser,
  deleteAllPostsRepliesByUser,
};
