// @flow
import React, { type Node } from 'react';
import { Avatar } from 'antd';

import { Flex, Box } from './Layout';
import { Text } from './Text';
import { colors } from '../util/style';
import { type SmallUser } from '../types/api';
import { type Size } from '../types/style';

export type Props = {
  size: Size,
  children: Node,
  ...SmallUser,
};

const UserAvatar = ({
  username,
  karma,
  profileImageUrl,
  size,
  children,
}: Props) => (
  <Flex align="center">
    <Avatar
      src={profileImageUrl}
      icon="user"
      size={size}
      style={{ backgroundColor: colors.blue }}
    />
    <Box ml="3px">
      <Text size={size}>
        {username}({karma})
      </Text>
    </Box>
    {children}
  </Flex>
);

UserAvatar.defaultProps = {
  karma: 0,
  size: 'small',
};

export default UserAvatar;
