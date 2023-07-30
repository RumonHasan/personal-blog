import { useEffect, useState } from 'react';
import { graphcms, QUERY_SINGLE_BLOG_POST } from '../Graphql/Queries';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setBlogPostContent } from '../store/projectSlice';
import BlogPost from '../components/BlogPost/BlogPost';
import './pagesStyles.css';
import CreateComments from '../components/CreateComments/CreateComments';

const BlogArticle = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [singleBlogPostContent, setSingleBlogPostContent] = useState([]);
  const [blogPostId, setBlogPostId] = useState('');

  // gets the blog post details
  useEffect(() => {
    graphcms.request(QUERY_SINGLE_BLOG_POST, { slug }).then((res) => {
      dispatch(setBlogPostContent(res.blogPosts[0]));
      setSingleBlogPostContent(res.blogPosts[0]);
      setBlogPostId(res.blogPosts[0].id);
    });
  }, [slug, dispatch]);

  return (
    <div className="blog-article-container">
      <BlogPost {...singleBlogPostContent} />
      <div className="comments-section">
        <CreateComments blogPostCommentId={blogPostId} />
      </div>
    </div>
  );
};

export default BlogArticle;
