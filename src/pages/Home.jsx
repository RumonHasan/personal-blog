import React, { useEffect } from 'react';
import { graphcms, QUERY_BLOG_POSTS } from '../Graphql/Queries';
import Posts from '../components/Posts/Posts';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogPosts, setPostWithCommentCount } from '../store/projectSlice';
import {
  graphcms as graphCommentsCms,
  QUERY_BLOG_POST_COMMENTS,
} from '../Graphql/Queries';

const Home = () => {
  const blogPosts = useSelector((data) => data.mainReducer.blogPosts);
  const dispatch = useDispatch();

  // getting the blog posts
  useEffect(() => {
    graphcms
      .request(QUERY_BLOG_POSTS)
      .then(({ blogPosts }) => dispatch(setBlogPosts(blogPosts)));
  }, [dispatch]);

  // getting comments and segregating them by posts and ids
  useEffect(() => {
    if (blogPosts.length) {
      let postIds = new Set();
      for (let post of blogPosts) {
        const postId = post.id;
        postIds.add(postId);
      }
      let postIdArray = [...postIds];
      for (let postId of postIdArray) {
        const fetchComments = async () => {
          const { comments } = await graphCommentsCms.request(
            QUERY_BLOG_POST_COMMENTS,
            {
              id: postId,
            }
          );
          dispatch(
            setPostWithCommentCount({
              postId: postId,
              commentCount: comments.length ? comments.length : 0,
            })
          );
        };
        fetchComments();
      }
    }
  }, [blogPosts, dispatch]);

  return (
    <React.Fragment>
      <Posts blogPosts={blogPosts} />
    </React.Fragment>
  );
};

export default Home;
