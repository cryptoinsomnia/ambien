import gql from 'graphql-tag';

const PostFragments = {
  post: gql`
    fragment PostData on Post {
      id
      title
      url
      createdAt
      author {
        username
      }
      comments {
        id
      }
      votes {
        id
      }
    }
  `,
};

export default PostFragments;
