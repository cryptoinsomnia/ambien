import gql from 'graphql-tag';
import Post from '../components/Post';
import Comment from '../components/Comment';
import '../fragments/PostFragment';

Comment.fragments = {
  comment: gql`
    fragment CommentData on Comment {
      content
      createdAt
      directParentType
      post {
        ...PostData
      }
    }
    ${Post.fragments.post}
  `,
};
