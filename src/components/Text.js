// @flow

// component(s) that are meant to define/restrain the allowable text styles
// on the site.
import styled from 'styled-components';

import { type Size } from '../types/style';

const fontSizeForSize: { [Size]: number } = {
  small: 12,
  medium: 14,
  large: 18,
};

const Text = styled.span`
  display: inline-block;
  font-size: ${props => fontSizeForSize[props.size]}px;
  ${props => props.bold && 'font-weight: 700'};
  ${props => props.italic && 'font-style: italic'};
  ${props => props.maxWidth && `max-width: ${props.maxWidth}`};
`;

Text.defaultProps = {
  size: 'medium',
};

export default Text;
