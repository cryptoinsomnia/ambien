// @flow

// component(s) that are meant to define/restrain the allowable text styles
// on the site.
import styled from 'styled-components';

import { Link as RouterLink } from 'react-router-dom';
import { colors } from '../util/style';

import { type Size } from '../types/style';

const fontSizeForSize: { [Size]: number } = {
  small: 12,
  medium: 14,
  large: 18,
};

export const Text = styled.span`
  display: inline-block;
  font-size: ${props => fontSizeForSize[props.size]}px;
  color: ${props => props.color};
  ${props => props.bold && 'font-weight: 700'};
  ${props => props.italic && 'font-style: italic'};
  ${props => props.maxWidth && `max-width: ${props.maxWidth}`};
`;

export const Heading = styled.h1`
  color: ${colors.black};
  font-weight: 700;
`;

Text.defaultProps = {
  size: 'medium',
  color: `${colors.darkGrey}`,
};

export const RouterText = Text.withComponent(RouterLink);
