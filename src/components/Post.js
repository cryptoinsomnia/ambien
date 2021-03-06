// @flow
import React from 'react';
import {Tag, Row, Col, Icon} from 'antd';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import styled from 'styled-components';
import gql from 'graphql-tag';

import {Box} from './Layout';
import {Text, RouterText} from './Text';
import UserAvatar from './UserAvatar';
import Vote from './Vote';
import Link from './Link';
import { idToDisplayName } from '../constants/tags';
import { type PostType } from '../types/api';
import { colors } from '../util/style';

// The props to a Post are everything in the FeedPost API object
// and the ranking (order it appears in the list).
export type Props = {
  rank: number,
  noLinks: boolean,
} & PostType;

const LinkIcon = styled (Icon)`
  color: ${colors.black};
  margin-left: 5px;
`;

const Post = ({
  rank,
  noLinks,
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
        <Vote id={id} type="POST" votes={votes} />
      </Row>
    </Col>
    <Col lg={23} xs={20}>
      <Row type="flex" justify="space-between">
        <Col xs={24} lg={19}>
          <Text size="large" bold="true">
            {rank !== undefined && rank !== '' && rank > 0 ? `${rank}. ` : ''}
            {noLinks
              ? <Text size="large" bold="true">{`${title}`}</Text>
              : <RouterText id={id} to={'/post/' + id} size="large" bold="true">
                  {`${title}`}
                </RouterText>}
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
        {noLinks
          ? <Text>{comments.length} comments</Text>
          : <Link>
              <RouterText id={id} to={'/post/' + id} size="medium">
                {comments.length} comments
              </RouterText>
            </Link>}
        <Box>
          {tags.map(tag => {
            const displayName = idToDisplayName[tag];
            return displayName ? <Tag key={tag}>{displayName}</Tag> : null;
          })}
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
      content
      url
      createdAt
      tags
      author {
        username
        profileImageUrl
        karma
      }
      comments {
        id
        content
        directParentType
        author {
          username
          karma
        }
        threadedParentComment {
          id
        }
        post {
          id
        }
        votes {
          id
          voter {
            id
          }
        }
        createdAt
      }
      votes {
        id
        voter {
          id
        }
      }
    }
  `,
};

Post.defaultProps = {
  tags: [],
  votes: [],
  comments: [],
  noLinks: false,
};

export default Post;
