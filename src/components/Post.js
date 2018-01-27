// @flow
import React from 'react';
import { Tag } from 'antd';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { Flex, Box } from './Layout';
import Text from './Text';
import UserAvatar from './UserAvatar';
import Voter from './Voter';
import { type FeedPost } from '../types/api';

// The props to a Post are everything in the FeedPost API object
// and the ranking (order it appears in the list).
export type Props = {
  rank: number,
} & FeedPost;

const Post = ({
  rank,
  // url,
  title,
  createdAt,
  author,
  comments,
  votes,
  tags,
  ...rest
}: Props) => (
  <Flex align="center" {...rest}>
    <Flex mr={2}>
      <Voter count={votes.length} onClick={() => {}} />
    </Flex>
    <Flex direction="column" width={1}>
      <Flex wrap justify="space-between">
        <Text size="large" bold mr={3}>{`${rank}. ${title}`}</Text>
        <UserAvatar {...author} size="small">
          <Text italic size="small" ml={1}>
            {`${distanceInWordsToNow(new Date(createdAt))} ago`}
          </Text>
        </UserAvatar>
      </Flex>
      <Flex wrap justify="space-between">
        <Text>{comments.length} comments</Text>
        <Box>
          {tags.map(tag => <Tag key={tag.name}>{tag.displayName}</Tag>)}
        </Box>
      </Flex>
    </Flex>
  </Flex>
);

Post.defaultProps = {
  tags: [{ name: 'btc', displayName: 'Bitcoin' }],
  votes: [],
  comments: [],
};

export default Post;
