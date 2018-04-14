// @flow
import React, {type Node} from 'react';
import {Avatar} from 'antd';

import {Flex, Box} from './Layout';
import {RouterText} from './Text';
import {colors} from '../util/style';
import {type SmallUser} from '../types/api';
import {type Size} from '../types/style';

export type Props = {
  size: Size,
  children: Node,
  username: string,
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
      style={{backgroundColor: colors.blue}}
    />
    <Box ml="3px">
      <RouterText size={size} to={'/user/' + username}>
        {username}({karma})
      </RouterText>
    </Box>
    {children}
  </Flex>
);

UserAvatar.defaultProps = {
  karma: 0,
  size: 'small',
};

export default UserAvatar;
