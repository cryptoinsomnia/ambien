// @flow
import React from 'react';

import {Text} from './Text';

export type Props = {
  content: string,
};

// TODO handle truncation and the "see more" operation
// TODO potentially don't show the 'this post has no content'
// if the content is empty.
const PostContent = ({content}: Props) => (
  <Text size="medium">
    {content !== undefined && content !== ''
      ? content
      : 'This post has no content'}
  </Text>
);

export default PostContent;
