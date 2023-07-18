import { useEffect } from 'react';
import Posts from '../components/Posts/Posts';
import { graphcms, QUERY_BLOG_POSTS_SEARCH } from '../Graphql/Queries';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchedBlogPosts } from '../store/projectSlice';

const SearchedPosts = () => {
  const { slug } = useParams();
  const searchedBlogPosts = useSelector(
    (data) => data.mainReducer.searchedBlogPosts
  );
  const dispatch = useDispatch();

  useEffect(() => {
    graphcms.request(QUERY_BLOG_POSTS_SEARCH, { slug }).then((res) => {
      dispatch(setSearchedBlogPosts(res.blogPosts));
    });
  }, [dispatch, slug]);

  return <Posts blogPosts={searchedBlogPosts} />;
};

export default SearchedPosts;
