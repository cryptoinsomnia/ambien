// @flow
import React from 'react';
import {Row} from 'antd';
import gql from 'graphql-tag';

import {Text} from './Text';
import CreateCommentOnComment from './CreateCommentOnComment';
import Post from './Post';

import {type CommentType} from '../types/api';

type Props = {|
  comment: CommentType,
|};

const Comment = ({comment}: Props) => (
  <Row type="flex" justify="start">
    <Text>{comment.author.username}: {comment.content}</Text>
    <CreateCommentOnComment
      postId={comment.post.id}
      parentCommentId={comment.id}
    />
  </Row>
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
