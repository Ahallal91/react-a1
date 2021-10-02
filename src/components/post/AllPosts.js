import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import { getAvatarByUser } from "../../data/userData";

// Displays all posts that have been posted on the site.
// If no posts are displayed it will display 'no posts..'
const AllPosts = (props) => {
  return (
    <>
      <h1 className="page-header">Posts</h1>
      <Container>
        {props.posts ? (
          Object.keys(props.posts).map((post, key) => {
            const postDate = new Date(props.posts[post].postDate);
            return (
              <Link to={`/allposts/${post}`} key={key} className="allposts__container">
                {props.posts[post].deleted ? (
                  <div className="p-2">
                    <span className="allposts__title text-danger">This post was removed</span>
                  </div>
                ) : (
                  <>
                    <Image
                      className="profile-image"
                      width={50}
                      height={50}
                      src={`images/avatars/${getAvatarByUser(props.posts[post].user)}.jpg`}
                      roundedCircle
                    />
                    <div>
                      <h2 className="allposts__title">{props.posts[post].title}</h2>
                      <span>Posted By: {props.posts[post].user}</span>
                      <span className="allposts__date">
                        Post Date: {postDate.getDate()}/{postDate.getMonth()}/{postDate.getYear()}
                      </span>
                    </div>
                  </>
                )}
              </Link>
            );
          })
        ) : (
          <h3>No Posts yet, why don't you make one?</h3>
        )}
      </Container>
    </>
  );
};

export default AllPosts;
