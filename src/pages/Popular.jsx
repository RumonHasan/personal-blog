import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '@mui/material';
import {
  graphcms as graphPostCommentscms,
  QUERY_BLOG_POST_COMMENTS,
  QUERY_BLOG_POSTS,
} from '../Graphql/Queries';
const Popular = () => {
  // note this is done locally for now... so it will not call api untill all the home posts are loaded
  const [popularPosts, setPopularPosts] = useState([]);
  const [postComments, setPostComments] = useState({});
  const [sortedCommentedPosts, setSortedCommentedPosts] = useState([]);
  const location = useLocation();

  // fetch blog posts
  const getBlogPosts = async () => {
    const { blogPosts } = await graphPostCommentscms.request(QUERY_BLOG_POSTS);
    setPopularPosts(blogPosts);
  };
  // fires everytime the location is within the popular path name
  useEffect(() => {
    if (location.pathname === '/popular') {
      getBlogPosts();
    }
  }, [location]);

  // getting the comments based on the id from the blog posts
  useEffect(() => {
    if (popularPosts.length > 0) {
      const fetchPostComments = async () => {
        let postCommentsObject = {};
        for (const post of popularPosts) {
          const postId = post.id;
          const { comments } = await graphPostCommentscms.request(
            QUERY_BLOG_POST_COMMENTS,
            { id: postId }
          );
          postCommentsObject[postId] = comments.length ? comments : [];
        }
        setPostComments(postCommentsObject);
      };
      fetchPostComments();
      // populating the posts with comments
    }
  }, [popularPosts, location]);

  // sorted the commented posts based on popularity
  useEffect(() => {
    const sortedPosts = popularPosts.map((post) => ({
      ...post,
      comments: postComments[post.id]?.length ? postComments[post.id] : [],
    }));
    setSortedCommentedPosts(
      sortedPosts.sort((a, b) => b.comments?.length - a.comments?.length)
    );
  }, [popularPosts, postComments]);

  return (
    <div className="popular-posts-container">
      <div className="popular-posts">
        {sortedCommentedPosts?.map((sortedPost) => {
          const commentLength = sortedPost.comments.length;
          const { title, id, slug } = sortedPost;
          return (
            <Link to={`/article/${slug}`} key={id}>
              <Card
                className="popular-post-card"
                sx={{ width: '100%', height: '100px', marginBottom: '10px' }}
              >
                <CardHeader
                  title={title}
                  subheader={`Number of Comments: ${commentLength}`}
                />
                <CardContent></CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
export default Popular;
