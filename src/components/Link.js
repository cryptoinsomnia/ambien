import styled from 'styled-components';
import { Link as RouterLink } from 'react-router-dom';
import { branch, renderComponent } from 'recompose';

const A = styled.a`
  &:hover {
    text-decoration: underline;
  }
`;
const RouterA = A.withComponent(RouterLink);

// Use react-router-dom link if `to` prop is present.
export default branch(({ to }) => !!to, renderComponent(RouterA))(A);
