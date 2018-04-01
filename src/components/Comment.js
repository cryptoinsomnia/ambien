// @flow
import React from 'react';
import gql from 'graphql-tag';

import {Text} from './Text';
import Post from './Post';

import {type CommentType} from '../types/api';

type Props = {|
  comment: CommentType,
|};

const Comment = ({comment}: Props) => (
  <Text>{comment.author.username}: {comment.content}</Text>
);

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
