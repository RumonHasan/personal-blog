import { useEffect, useState } from 'react';
import {
  graphcms,
  QUERY_SINGLE_BLOG_POST,
  QUERY_BLOG_POST_COMMENTS,
} from '../Graphql/Queries';
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
  const [comments, setComments] = useState([]);

  // gets the blog post details
  useEffect(() => {
    graphcms.request(QUERY_SINGLE_BLOG_POST, { slug }).then((res) => {
      dispatch(setBlogPostContent(res.blogPosts[0]));
      setSingleBlogPostContent(res.blogPosts[0]);
    });
  }, [slug, dispatch]);

  // querying all the blog post comments based on a single blog post id
  useEffect(() => {
    if (singleBlogPostContent) {
      const blogPostId = singleBlogPostContent.id;
      graphcms.request(QUERY_BLOG_POST_COMMENTS, { blogPostId }).then((res) => {
        console.log(res);
      });
    }
  }, [singleBlogPostContent]);

  return (
    <div className="blog-article-container">
      <BlogPost {...singleBlogPostContent} />
      <CreateComments />
    </div>
  );
};

export default BlogArticle;
