import { useEffect } from 'react';
import { graphcms, QUERY_SINGLE_BLOG_POST } from '../Graphql/Queries';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setBlogPostContent } from '../store/projectSlice';
import BlogPost from '../components/BlogPost/BlogPost';

const BlogArticle = () => {
  const blogPostContent = useSelector(
    (data) => data.mainReducer.blogPostContent
  );
  const { slug } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    graphcms
      .request(QUERY_SINGLE_BLOG_POST, { slug })
      .then((res) => dispatch(setBlogPostContent(res.blogPosts[0])));
  }, [slug, dispatch]);

  return <BlogPost {...blogPostContent} />;
};

export default BlogArticle;
