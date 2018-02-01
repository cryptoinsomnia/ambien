// @flow
import React from 'react';
import styled from 'styled-components';
import ReactImageFallback from "react-image-fallback";
import { Tabs } from 'antd';

import { Flex, Box, Island } from './Layout';
import { borderRadius, borderColor, borderWidth } from 'styled-system'
import { SmallUser } from '../types/api';

import { colors } from '../util/style';
import Text from './Text';

const TabPane = Tabs.TabPane;
const ProfileImage = styled(ReactImageFallback)`

`;

const Profile = ({name, username, profileImageUrl, karma} : SmallUser) => (
    <Flex align="center" direction="column">
        <Box my={[1,2,3,3]} borderRadius={100} borderColor={colors.blue} borderWidth={1} width={200} height={200}>
          <ProfileImage src={profileImageUrl} fallbackImage="http://www.upplanet.com/bighero/outlay-demo/img/customer_avatar.png" alt={username} />
        </Box>
        <Text my={1}>{name} - @{username} - {karma}</Text>
        <Island my={[1,2,2,2]} maxWidth="1000px" width={[0.85,0.85,0.9,1.0]}>
            <Tabs type="card" mx={[4,3,2,1]}>
                <TabPane tab="1233 Posts" key="1">Content of Tab Pane 1</TabPane>
                <TabPane tab="4354 Upvotes" key="2">Content of Tab Pane 2</TabPane>
                <TabPane tab="6764 Commments" key="3">Content of Tab Pane 3</TabPane>
            </Tabs>
        </Island>
    </Flex>
);

Profile.defaultProps = {
    name : "Ruud Visser",
    username : "rgmvisser",
    profileImageUrl : "https://media.licdn.com/mpr/mpr/shrinknp_200_200/p/3/005/064/0e1/2ebf2c5.jpg",
    karma : 1346543
};

export default Profile;