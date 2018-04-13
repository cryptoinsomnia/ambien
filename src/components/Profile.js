// @flow
import React, { Fragment, type Node } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

import Post from './Post';
import Comment from './Comment';
import Vote from './Vote';

import { Tabs, Spin } from 'antd';
import { Flex, Box, Island } from './Layout';
import {
  type SmallUser,
  type PostType,
  type CommentType,
  type VoteType,
} from '../types/api';

import { Heading, SubHeading } from './Text';
import Image from './Image';
import PostList from './PostList';

const TabPane = Tabs.TabPane;

type UserProps = {|
  user: SmallUser,
  karma: string,
|};

type Props = {|
  ...UserProps,
  isLoading: boolean,
  posts: Array<PostType>,
  comments: Array<CommentType>,
  votes: Array<VoteType>,
|};
const MessageBox = ({ children }: { children: Node }) => (
  <Flex align="center" direction="column">
    <Box my={4}>{children}</Box>
  </Flex>
);

const LoadingProfile = () => (
  <MessageBox>
    <Spin size="large" />
  </MessageBox>
);

const UserNotFound = () => (
  <MessageBox>
    <Heading>User not found :(</Heading>
  </MessageBox>
);

const UserProfileInformation = ({ user, karma }: UserProps) => (
  <Fragment>
    <Box my={[1, 2, 3, 3]}>
      <Image
        borderRadius
        hasBorder
        src={user.profileImageUrl}
        fallbackImage="http://www.upplanet.com/bighero/outlay-demo/img/customer_avatar.png"
        alt={user.username}
      />
    </Box>
    <Heading>{user.name}</Heading>
    <SubHeading>
      @{user.username} - {karma}
    </SubHeading>
  </Fragment>
);

const labelCounter = (num: number, label: string): string => {
  if (num === 1) {
    return `1 ${label}`;
  } else {
    return `${num} ${label}s`;
  }
};

const Profile = ({ user, posts, comments, votes, isLoading, karma }: Props) => {
  if (isLoading) {
    return <LoadingProfile />;
  } else if (!user) {
    return <UserNotFound />;
  } else {
    return (
      <Flex align="center" direction="column">
        <UserProfileInformation user={user} karma={karma} />
        <Island
          my={[1, 2, 2, 2]}
          maxWidth="1000px"
          width={[0.85, 0.85, 0.9, 1.0]}
        >
          <Tabs type="card" mx={[4, 3, 2, 1]}>
            <TabPane tab={labelCounter(posts.length, 'Post')} key="posts">
              {posts.length === 0 ? (
                <MessageBox>
                  <SubHeading>
                    {user.name} has not made any posts yet
                  </SubHeading>
                </MessageBox>
              ) : (
                <PostList posts={posts} />
              )}
            </TabPane>
            <TabPane
              tab={labelCounter(comments.length, 'Comment')}
              key="comments"
            >
              {comments.length === 0 ? (
                <MessageBox>
                  <SubHeading>
                    {user.name} has not commented on any posts yet
                  </SubHeading>
                </MessageBox>
              ) : (
                <Fragment>
                  {comments.map((comment, index) => (
                    <Box key={comment.id} borderBottom py={2}>
                      <Post rank={index + 1} {...comment.post} />
                    </Box>
                  ))}
                </Fragment>
              )}
            </TabPane>
            <TabPane tab={labelCounter(votes.length, 'Vote')} key="upvotes">
              {votes.length === 0 ? (
                <MessageBox>
                  <SubHeading>
                    {user.name} has not voted on any posts yet
                  </SubHeading>
                </MessageBox>
              ) : (
                <Fragment>
                  {votes.map((vote, index) => (
                    <Box key={vote.id} borderBottom py={2}>
                      <Post rank={index + 1} {...vote.post} />
                    </Box>
                  ))}
                </Fragment>
              )}
            </TabPane>
          </Tabs>
        </Island>
      </Flex>
    );
  }
};

Profile.defaultProps = {
  isLoading: true,
  karma: 123456,
  posts: [],
  comments: [],
};

const User = gql`
  query UserProfile($usernameToFetch: String!) {
    user(username: $usernameToFetch) {
      id
      name
      username
      profileImageUrl
      posts {
        ...PostData
      }
      comments {
        ...CommentData
      }
      votes {
        ...VoteData
        post {
          ...PostData
        }
      }
    }
  }
  ${Post.fragments.post}
  ${Comment.fragments.comment}
  ${Vote.fragments.vote}
`;

const withData = graphql(User, {
  options: props => ({
    variables: {
      usernameToFetch: props.username,
    },
    notifyOnNetworkStatusChange: true,
  }),
  props: ({ data: { loading, user } }) => ({
    isLoading: loading,
    user: user,
    posts: loading || !user ? {} : user.posts,
    comments: loading || !user ? {} : user.comments,
    votes: loading || !user ? {} : user.votes,
  }),
});

export default compose(withData)(Profile);
