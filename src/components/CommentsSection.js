// @flow
import React from 'react';

import {Box, Flex, Island} from './Layout';
import CommentList from './CommentList';
import CreateComment from './CreateComment';
import {type CommentType} from '../types/api';
import {type PostType} from '../types/api';

type Props = {|
  comments: Array<CommentType>,
  post: PostType,
|};

const CommentsSection = ({post, comments}: Props) => (
  <Flex align="center" direction="column">
    <Island my={3} width={[0.95, 0.95, 0.8, 0.8]}>
      <Box borderBottom py={2}>
        <CreateComment post={post} />
      </Box>
      <CommentList comments={comments} />
    </Island>
  </Flex>
);

export default CommentsSection;
