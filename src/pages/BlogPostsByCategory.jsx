import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Posts from '../components/Posts/Posts';
import { graphcms, QUERY_BLOG_POSTS_CATEGORIES } from '../Graphql/Queries';

const BlogPostsByCategory = () => {
  const { slug } = useParams();
  const [postsByCategories, setPostsByCategories] = useState([]);

  // fetching posts based on categories
  useEffect(() => {
    graphcms
      .request(QUERY_BLOG_POSTS_CATEGORIES, { slug })
      .then((res) => setPostsByCategories(res.blogPosts));
  }, [slug]);

  return (
    <React.Fragment>
      <Posts blogPosts={postsByCategories} />
    </React.Fragment>
  );
};

export default BlogPostsByCategory;
