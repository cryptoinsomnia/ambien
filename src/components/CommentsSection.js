// @flow
import React from 'react';

import {Flex, Island} from './Layout';
import CommentList from './CommentList';
import CreateComment from './CreateComment';

const CommentsSection = () => (
  <Flex align="center" direction="column">
    <Island my={3} width={[0.95, 0.95, 0.5, 0.4]}>
      <CreateComment />
      <CommentList comments={[]} />
    </Island>
  </Flex>
);

export default CommentsSection;
