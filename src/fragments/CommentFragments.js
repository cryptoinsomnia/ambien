import gql from 'graphql-tag';
import PostFragments from './PostFragments';

const CommentFragments = {
  comment: gql`
    fragment CommentData on Comment {
      content
      createdAt
      directParentType
      post {
        ...PostData
      }
    }
    ${PostFragments.post}
  `,
};

export default CommentFragments;
