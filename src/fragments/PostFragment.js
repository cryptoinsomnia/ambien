import gql from 'graphql-tag';
import Post from '../components/Post';

Post.fragments = {
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
