// @flow
import * as React from 'react';

import Post from './Post';

import {Box} from './Layout';

import {type PostType} from '../types/api';

type Props = {|
  posts: Array<PostType>,
|};

const PostList = ({posts}: Props) => (
  <React.Fragment>
    {posts.map ((post, index) => (
      <Box key={post.id} borderBottom py={2}>
        <Post rank={index + 1} {...post} />
      </Box>
    ))}
  </React.Fragment>
);

PostList.defaultProps = {
  posts: [],
};

export default PostList;
