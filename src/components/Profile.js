// @flow
import * as React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { compose } from 'recompose';

import Post from './Post';
import '../fragments/PostFragment';

import { Tabs, Spin } from 'antd';
import { Flex, Box, Island } from './Layout';
import { type SmallUser, type FeedPost } from '../types/api';

import { Heading, SubHeading } from './Text';
import Image from './Image';
import PostList from './PostList';

const TabPane = Tabs.TabPane;

type UserProps = {|
  user: SmallUser,
  profileImageUrl: string,
  karma: string,
|};

type Props = {|
  ...UserProps,
  isLoading: boolean,
  posts: Array<FeedPost>,
|};

const LoadingProfile = () => (
  <Flex align="center" direction="column">
    <Box my={4}>
      <Spin size="large" />
    </Box>
  </Flex>
);

const UserNotFound = () => (
  <Flex align="center" direction="column">
    <Box my={4}>
      <Heading>User not found :(</Heading>
    </Box>
  </Flex>
);

const UserProfileInformation = ({
  user,
  profileImageUrl,
  karma,
}: UserProps) => (
  <React.Fragment>
    <Box my={[1, 2, 3, 3]}>
      <Image
        borderRadius
        hasBorder
        src={profileImageUrl}
        fallbackImage="http://www.upplanet.com/bighero/outlay-demo/img/customer_avatar.png"
        alt={user.username}
      />
    </Box>
    <Heading>{user.name}</Heading>
    <SubHeading>
      @{user.username} - {karma}
    </SubHeading>
  </React.Fragment>
);

const labelCounter = (num: number, label: string): string => {
  if (num == 1) {
    return `1 ${label}`;
  } else {
    return `${num} ${label}s`;
  }
};

const Profile = ({ user, posts, isLoading, profileImageUrl, karma }: Props) => {
  if (isLoading) {
    return <LoadingProfile />;
  } else if (!user) {
    return <UserNotFound />;
  } else {
    return (
      <Flex align="center" direction="column">
        <UserProfileInformation
          user={user}
          karma={karma}
          profileImageUrl={profileImageUrl}
        />
        <Island
          my={[1, 2, 2, 2]}
          maxWidth="1000px"
          width={[0.85, 0.85, 0.9, 1.0]}
        >
          <Tabs type="card" mx={[4, 3, 2, 1]}>
            <TabPane tab={labelCounter(posts.length, 'Post')} key="posts">
              <PostList posts={posts} />
            </TabPane>
            <TabPane tab="4354 Upvotes" key="comments">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab="6764 Commments" key="upvotes">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </Island>
      </Flex>
    );
  }
};

Profile.defaultProps = {
  isLoading: true,
  profileImageUrl:
    'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/064/0e1/2ebf2c5.jpg',
  karma: 123456,
};

const User = gql`
  query UserProfile($usernameToFetch: String!) {
    User(username: $usernameToFetch) {
      id
      name
      username
      posts {
        ...PostData
      }
    }
  }
  ${Post.fragments.post}
`;

const withData = graphql(User, {
  options: props => ({
    variables: {
      usernameToFetch: props.username,
    },
    notifyOnNetworkStatusChange: true,
  }),
  props: ({ data: { loading, User } }) => ({
    isLoading: loading,
    user: User,
    posts: loading || !User ? {} : User.posts,
  }),
});

export default compose(withData)(Profile);
