// @flow
import React from 'react';
import gql from 'graphql-tag';

import { Text } from './Text';
import Post from './Post';
import Comment from './Comment';

const Vote = () => <Text>To be made</Text>;

Vote.fragments = {
  vote: gql`
    fragment VoteData on Vote {
      id
      createdAt
      contentType
      post {
        ...PostData
      }
      comment {
        ...CommentData
      }
      voter {
        id
        name
        username
        profileImageUrl
      }
    }
    ${Post.fragments.post}
    ${Comment.fragments.comment}
  `,
};

export default Vote;
