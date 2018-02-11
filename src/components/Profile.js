// @flow
import React from 'react';
import { Tabs } from 'antd';

import { Flex, Box, Island } from './Layout';
import { type SmallUser } from '../types/api';

<<<<<<< HEAD
import { Text } from './Text';
import Image from './Image';

const TabPane = Tabs.TabPane;

const Profile = ({ name, username, profileImageUrl, karma }: SmallUser) => (
  <Flex align="center" direction="column">
    <Box my={[1, 2, 3, 3]}>
      <Image
        borderRadius
        hasBorder
        src={profileImageUrl}
        fallbackImage="http://www.upplanet.com/bighero/outlay-demo/img/customer_avatar.png"
        alt={username}
      />
    </Box>
    <Text my={1}>
      {name} - @{username} - {karma}
    </Text>
    <Island my={[1, 2, 2, 2]} maxWidth="1000px" width={[0.85, 0.85, 0.9, 1.0]}>
      <Tabs type="card" mx={[4, 3, 2, 1]}>
        <TabPane tab="1233 Posts" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="4354 Upvotes" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="6764 Commments" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </Island>
  </Flex>
);

Profile.defaultProps = {
  name: 'Ruud Visser',
  username: 'rgmvisser',
  profileImageUrl:
    'https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/064/0e1/2ebf2c5.jpg',
  karma: 1346543,
};

export default Profile;
=======
export type Props = {
  id: string,
  user: SmallUser,
  isLoading: boolean,
  isLoggedIn: boolean,
};

const Profile = ({ user, isLoading, isLoggedIn }: Props) => (
  <Row type="flex" align="middle">
    {isLoading ? (
      <Spin size="large" />
    ) : (
      <div>
        <Text> | isLoggedIn: {isLoggedIn} </Text>
        <Text> | id: {user.id} </Text>
        <Text> | username: {user.username}</Text>
      </div>
    )}
  </Row>
);

Profile.defaultProps = {
  isLoggedIn: false,
};

const User = gql`
  query User($id: ID!) {
    User(id: $id) {
      id
      username
    }
  }
`;

const withData = graphql(User, {
  options: ({ id }) => ({
    id: id,
    notifyOnNetworkStatusChange: true,
  }),
  props: ({ data: { loading, User } }) => ({
    isLoading: loading,
    user: User,
  }),
});

export default compose(withData)(Profile);
>>>>>>> Bump apollo dependency back to 2.0 and remove unused files
