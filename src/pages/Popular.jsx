import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  graphcms as graphPostCommentscms,
  QUERY_BLOG_POST_COMMENTS,
} from '../Graphql/Queries';
const Popular = () => {
  // note this is done locally for now... so it will not call api untill all the home posts are loaded
  const blogPosts = useSelector((state) => state.mainReducer.blogPosts);
  const [popularPosts, setPopularPosts] = useState([]);
  const [postComments, setPostComments] = useState({});

  // getting the comments by post and storing them by id
  useEffect(() => {
    if (blogPosts) {
      const fetchPostComments = async () => {
        let postCommentsObject = {};
        for (const post of blogPosts) {
          const postId = post.id;
          const { comments } = await graphPostCommentscms.request(
            QUERY_BLOG_POST_COMMENTS,
            { id: postId }
          );
          // Update state using functional update
          postCommentsObject[postId] = comments.length ? comments : [];
        }
        setPostComments(postCommentsObject);
      };
      fetchPostComments();
    }
  }, [blogPosts]);

  return <></>;
};
export default Popular;
