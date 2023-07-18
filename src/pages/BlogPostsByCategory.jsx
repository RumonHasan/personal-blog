import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Posts from '../components/Posts/Posts';
import { graphcms, QUERY_BLOG_POSTS_CATEGORIES } from '../Graphql/Queries';
import { useDispatch, useSelector } from 'react-redux';
import { setPostsByCategories } from '../store/projectSlice';

const BlogPostsByCategory = () => {
  const { slug } = useParams();
  const postsByCategories = useSelector(
    (data) => data.mainReducer.postsByCategories
  );
  const dispatch = useDispatch();

  // fetching posts based on categories
  useEffect(() => {
    graphcms
      .request(QUERY_BLOG_POSTS_CATEGORIES, { slug })
      .then((res) => dispatch(setPostsByCategories(res.blogPosts)));
  }, [dispatch, slug]);

  return (
    <React.Fragment>
      <Posts blogPosts={postsByCategories} />
    </React.Fragment>
  );
};

export default BlogPostsByCategory;
