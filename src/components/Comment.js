// @flow
import React from 'react';
import gql from 'graphql-tag';

import { Text } from './Text';
import Post from './Post';

const Comment = () => <Text>To be made</Text>;

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

export default Comment;
