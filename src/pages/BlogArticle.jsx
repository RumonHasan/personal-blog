import React, { useState, useEffect } from 'react';
import { graphcms, QUERY_SINGLE_BLOG_POST } from '../Graphql/Queries';
import { useParams } from 'react-router-dom';

const BlogArticle = () => {
  const [blogPost, setBlogPost] = useState([]);
  const { slug } = useParams();

  useEffect(() => {
    graphcms
      .request(QUERY_SINGLE_BLOG_POST, { slug })
      .then((res) => setBlogPost(res.blogPosts[0]));
  }, [slug]);

  return <div>BlogArticle</div>;
};

export default BlogArticle;
