// @flow
import * as React from 'react';

import Comment from './Comment';

import { Box } from './Layout';

import { type CommentType } from '../types/api';

type Props = {|
  comments: Array<CommentType>,
|};

const CommentList = ({ comments }: Props) => (
  <React.Fragment>
    {comments.map(comment => (
      <Box key={comment.id} borderBottom py={2}>
        <Comment comment={comment} />
      </Box>
    ))}
  </React.Fragment>
);

CommentList.defaultProps = {
  comments: [],
};

export default CommentList;
