import { useEffect, useState } from 'react';
import Posts from '../components/Posts/Posts';
import { graphcms, QUERY_BLOG_POSTS_SEARCH } from '../Graphql/Queries';
import { useParams } from 'react-router-dom';

const SearchedPosts = () => {
  const { slug } = useParams();
  const [searchedProjects, setSearchedProjects] = useState([]);

  useEffect(() => {
    graphcms.request(QUERY_BLOG_POSTS_SEARCH, { slug }).then((res) => {
      setSearchedProjects(res.blogPosts);
    });
  }, [slug]);

  return <Posts blogPosts={searchedProjects} />;
};

export default SearchedPosts;
