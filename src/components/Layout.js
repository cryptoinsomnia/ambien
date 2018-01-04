// @flow
import styled from 'styled-components';
import { Box as GridBox, Flex as GridFlex } from 'grid-styled';
import { Layout } from 'antd';

import { colors } from '../util/style';

export default styled(Layout)``;

export const Box = styled(GridBox)`
  ${props => props.white && `background: ${colors.whiteBackground}`};
`;

export const Flex = Box.withComponent(GridFlex);
