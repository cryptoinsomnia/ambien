// @flow
import React from 'react';

import {Flex, Island} from './Layout';
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
    <Island my={3} width={[0.95, 0.95, 0.5, 0.4]}>
      <CreateComment post={post} />
      <CommentList comments={comments} />
    </Island>
  </Flex>
);

export default CommentsSection;
