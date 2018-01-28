// @flow
import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

import { Flex } from './Layout';
import Text from './Text';

export type Props = {|
  count: number,
  onClick: () => void,
|};

const VotingIcon = styled(Icon)`
  cursor: pointer;
  font-size: 1.2em;
  position: relative;
  &:hover {
    bottom: 2px;
  }
`;

const Voter = ({ count, onClick }: Props) => (
  <Flex direction="column" align="center">
    <VotingIcon onClick={onClick} type="caret-up" />
    <Text>{count}</Text>
  </Flex>
);

export default Voter;
