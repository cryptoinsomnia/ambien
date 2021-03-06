// @flow
// File for visual primitives components.
import styled from 'styled-components';
import {modularScale} from 'polished';
import {Flex as GridFlex} from 'grid-styled';
import {space, width} from 'styled-system';
import {Layout} from 'antd';

import {media} from '../util/style';
import {colors, boxShadow, borderRadius} from '../util/style';

export default styled (Layout)``;

export const Box = styled.div`
  ${space};
  ${width};
  ${props => props.white && `background: ${colors.whiteBackground}`};
  ${props => props.boxShadow && `box-shadow: ${boxShadow}`};
  ${props => props.maxWidth && `max-width: ${props.maxWidth}`};
  ${props => props.borderBottom && `border-bottom: 1px solid ${colors.lightGrey}`};
  ${props => props.heavyBorderBottom && `border-bottom: 3px solid ${colors.darkGrey}`};
  ${props => props.marginLeft && `margin-left: ${props.marginLeft}`};
  ${props => props.marginRight && `margin-left: 10px`};
`;

export const Island = styled.section`
  background: ${colors.whiteBackground};
  box-shadow: ${boxShadow};
  border-radius: ${borderRadius};
  ${space};
  ${width};
  ${props => props.maxWidth && `max-width: ${props.maxWidth}`};
  padding: ${modularScale (2)};
  ${media.xs`
    padding: ${modularScale (0)};
  `};
`;

export const Flex = GridFlex.withComponent (Box);
