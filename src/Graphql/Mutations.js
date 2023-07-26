import { GraphQLClient, gql } from 'graphql-request';

export const graphcms = new GraphQLClient(import.meta.env.VITE_MASTER_API_KEY, {
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_MASTER_APP_TOKEN}`,
  },
});

const commentObj = `
    $name: String!,
    $email: String!,
    $comment: String!,
    $slug: String!
`;

const commentData = `
    name: $name,
    email: $email,
    comment: $comment,
    blogPost: {
        connect: {slug: $slug}
    }
`;

// passing a new comment with the comment data and using the comment object for modeling
export const CREATE_COMMENT = gql`
    mutation CreateComment(${commentObj}){
        createComment(data: {${commentData}}){
            id
        }
    }
`;

// publishing comments to the respective blog based on id
export const PUBLISH_COMMENT = gql`
  mutation PublishComment($id: ID!) {
    publishComment(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;
