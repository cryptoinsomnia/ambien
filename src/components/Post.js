// @flow
import React from 'react';
import { Tag, Row, Col } from 'antd';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';

import { Box } from './Layout';
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
}: Props) => (
  <Row type="flex" align="middle">
    <Col lg={1} xs={4}>
      <Row type="flex" align="middle" justify="center">
        <Voter count={votes.length} onClick={() => {}} />
      </Row>
    </Col>
    <Col lg={23} xs={20}>
      <Row type="flex" wrap justify="space-between">
        <Col xs={24} lg={19}>
          <Text size="large" bold>{`${rank}. ${title}`}</Text>
        </Col>
        <Col lg={5}>
          <Row type="flex" justify="end">
            <UserAvatar {...author} size="small">
              <Text italic size="small" ml={1}>
                {`${distanceInWordsToNow(new Date(createdAt))} ago`}
              </Text>
            </UserAvatar>
          </Row>
        </Col>
      </Row>
      <Row type="flex" wrap justify="space-between">
        <Text>{comments.length} comments</Text>
        <Box>
          {tags.map(tag => <Tag key={tag.name}>{tag.displayName}</Tag>)}
        </Box>
      </Row>
    </Col>
  </Row>
);

Post.defaultProps = {
  tags: [{ name: 'btc', displayName: 'Bitcoin' }],
  votes: [],
  comments: [],
};

export default Post;
