// @flow
import { Box } from 'grid-styled';
import styled from 'styled-components';

import { colors } from '../util/style';

export default styled(Box)`
  ${props => props.white && `background: ${colors.whiteBackground}`};
`;
