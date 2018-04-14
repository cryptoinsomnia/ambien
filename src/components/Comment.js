// @flow
import * as React from 'react';
import {Row, Col} from 'antd';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import gql from 'graphql-tag';

import {Box} from './Layout';
import {Text} from './Text';
import Vote from './Vote';
import UserAvatar from './UserAvatar';
import CreateCommentOnComment from './CreateCommentOnComment';
import Post from './Post';
import {colors} from '../util/style';

import {type CommentType, type SmallUser, type VoteType} from '../types/api';

type Props = {|
  comment: CommentType,
  createdAt: string,
  author: SmallUser,
  votes: Array<VoteType>,
|};

const Comment = ({comment, createdAt, author, votes}: Props) => (
  <React.Fragment>
    <Row
      type="flex"
      align="middle"
      style={{backgroundColor: colors.superLightGrey}}
    >
      <Col lg={1} xs={4}>
        <Row type="flex" align="middle" justify="center">
          <Vote id={comment.id} type="COMMENT" votes={votes} />
        </Row>
      </Col>
      <Col lg={22} xs={10}>
        <Row type="flex" justify="space-between">
          <Col xs={14} lg={16}>
            <Text>{comment.author.username}: {comment.content}</Text>
          </Col>
          <Col lg={8}>
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

      </Col>
    </Row>
    <Row
      type="flex"
      align="right"
      style={{backgroundColor: colors.superLightGrey}}
    >
      <Col lg={24} xs={14}>
        <CreateCommentOnComment
          postId={comment.post.id}
          parentCommentId={comment.id}
        />
      </Col>
    </Row>
  </React.Fragment>
);

Comment.defaultProps = {
  votes: [],
};

Comment.fragments = {
  comment: gql`
    fragment CommentData on Comment {
      content
      createdAt
      directParentType
      post {
        ...PostData
      }
    }
    ${Post.fragments.post}
  `,
};

export default Comment;
