// @flow
// File for visual primitives components.
import styled from 'styled-components';
import { modularScale } from 'polished';
import { Box as GridBox, Flex as GridFlex } from 'grid-styled';
import { space } from 'styled-system';
import { Layout } from 'antd';

import { colors, boxShadow, borderRadius } from '../util/style';

export default styled(Layout)``;

export const Box = styled(GridBox)`
  ${props => props.white && `background: ${colors.whiteBackground}`};
  ${props => props.boxShadow && `box-shadow: ${boxShadow}`};
`;

export const Island = styled.section`
  background: ${colors.whiteBackground};
  box-shadow: ${boxShadow};
  border-radius: ${borderRadius};
  padding: ${modularScale(2)};
  ${space};
`;

export const Flex = Box.withComponent(GridFlex);
