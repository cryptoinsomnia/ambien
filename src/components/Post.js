// @flow
import React from 'react';
import {Tag, Row, Col, Icon} from 'antd';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import styled from 'styled-components';
import gql from 'graphql-tag';

import {Box} from './Layout';
import {Text, RouterText} from './Text';
import UserAvatar from './UserAvatar';
import Voter from './Voter';
import Link from './Link';
import {type PostType} from '../types/api';
import {colors} from '../util/style';

// The props to a Post are everything in the FeedPost API object
// and the ranking (order it appears in the list).
export type Props = {
  rank: number,
} & PostType;

const LinkIcon = styled (Icon)`
  color: ${colors.black};
  margin-left: 5px;
`;

const Post = ({
  rank,
  id,
  url,
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
      <Row type="flex" justify="space-between">
        <Col xs={24} lg={19}>
          <Text size="large" bold>
            {`${rank}. `}
            <RouterText id={id} to={'post/' + id} size="large" bold>
              {`${title}`}
            </RouterText>
            {url &&
              <Link href={url} target="_blank">
                <LinkIcon type="link" />
              </Link>}
          </Text>
        </Col>
        <Col lg={5}>
          <Row type="flex" justify="end">
            <UserAvatar {...author} size="small">
              <Box ml={1}>
                <Text italic size="small">
                  {`${distanceInWordsToNow (new Date (createdAt))} ago`}
                </Text>
              </Box>
            </UserAvatar>
          </Row>
        </Col>
      </Row>
      <Row type="flex" justify="space-between">
        <Link>{comments.length} comments</Link>
        <Box>
          {tags.map (tag => <Tag key={tag.name}>{tag.displayName}</Tag>)}
        </Box>
      </Row>
    </Col>
  </Row>
);

Post.fragments = {
  post: gql`
    fragment PostData on Post {
      id
      title
      url
      createdAt
      author {
        username
      }
      comments {
        id
      }
      votes {
        id
      }
    }
  `,
};

Post.defaultProps = {
  tags: [{name: 'btc', displayName: 'Bitcoin'}],
  votes: [],
  comments: [],
};

export default Post;
