// @flow
import styled from 'styled-components';
import { Box as GridBox, Flex as GridFlex } from 'grid-styled';
import { Layout } from 'antd';

import { colors, boxShadow } from '../util/style';

export default styled(Layout)``;

export const Box = styled(GridBox)`
  ${props => props.white && `background: ${colors.whiteBackground}`};
  ${props =>
    props.borderBottom && `border-bottom: 1px solid ${colors.lightGrey}`};
  ${props => props.borderTop && `border-top: 1px solid ${colors.lightGrey}`};
  ${props => props.boxShadow && `box-shadow: ${boxShadow}`};
`;

export const Flex = Box.withComponent(GridFlex);
