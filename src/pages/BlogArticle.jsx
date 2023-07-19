import { useEffect, useState } from 'react';
import { graphcms, QUERY_SINGLE_BLOG_POST } from '../Graphql/Queries';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBlogPostContent } from '../store/projectSlice';
import BlogPost from '../components/BlogPost/BlogPost';

const BlogArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [singleBlogPostContent, setSingleBlogPostContent] = useState([]);

  useEffect(() => {
    graphcms.request(QUERY_SINGLE_BLOG_POST, { slug }).then((res) => {
      dispatch(setBlogPostContent(res.blogPosts[0]));
      setSingleBlogPostContent(res.blogPosts[0]);
    });
  }, [slug, dispatch]);

  return <BlogPost {...singleBlogPostContent} />;
};

export default BlogArticle;
