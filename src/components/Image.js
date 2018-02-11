import styled from 'styled-components';
import ReactImageFallback from 'react-image-fallback';
import { colors, boxShadow } from '../util/style';

const Image = styled(ReactImageFallback)`
  ${props =>
    props.hasBorder && `border: ${props.borderWidth}px solid ${colors.blue}`};
  ${props => props.borderRadius && `border-radius: ${props.width / 2}px`};
  ${props => props.boxShadow && `box-shadow: ${boxShadow}`};
  height: ${props => props.width * props.ratio};
  width: ${props => props.width};
`;

Image.defaultProps = {
  borderWidth: 1,
  ratio: 1,
  width: 200,
};

export default Image;
