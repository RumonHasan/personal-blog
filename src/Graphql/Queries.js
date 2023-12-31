import { GraphQLClient, gql } from 'graphql-request';

// main graph ql client
export const graphcms = new GraphQLClient(import.meta.env.VITE_MASTER_API_KEY);

const category = `
id,
name,
slug,
color {css}
categoryCoverImage {url}`;

const blogPost = `
    id,
    title,
    slug,
    updatedAt
    createdAt
    coverImage {url}
    content {html}
    description
    blogStatus
`;

const comment = `
    id,
    name,
    email,
    comment
`;

// fetch the categories
export const QUERY_SLUG_CATEGORIES = gql`
    {
        categories(){
            name,
            slug,
            categoryCoverImage {url}
        }
    }
`;
// querying the blog post
export const QUERY_BLOG_POSTS = gql`
{
    blogPosts(orderBy: updatedAt_DESC){
        ${blogPost}
        categories(){
            ${category}
        }
    }
}
`;

// querying the blog posts by categories
export const QUERY_BLOG_POSTS_CATEGORIES = gql`
    query GetBlogPostsByCategory($slug: String!){
        blogPosts(where: {categories_some: {slug: $slug}}){
            ${blogPost}
            categories(){
                ${category}
            }
        }
    }
`;

// querying the blog posts based on search term
export const QUERY_BLOG_POSTS_SEARCH = gql`
    query GetBlogPostsBySearchTerm($slug: String!){
        blogPosts(where: {_search: $slug, AND: { slug_contains: $slug}}){
            ${blogPost}
            categories(){
                ${category}
            }
        }
}
`;

// get an array of len 1 blog posts.
export const QUERY_SINGLE_BLOG_POST = gql`
    query GetSingleBlogPostDetails($slug: String!){
        blogPosts(where: {slug: $slug}){
            ${blogPost}
            categories(){
                ${category}
            }
        }
    }
`;

// get the comments by the id of the blog post
export const QUERY_BLOG_POST_COMMENTS = gql`
  query blogPostComments($id: ID!) {
    comments(where: { blogPost: { id: $id } }) {
      ${comment}
    }
  }
`;
