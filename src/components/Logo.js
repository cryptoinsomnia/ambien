// @flow
import React from 'react';
import styled from 'styled-components';
import { Flex } from './Layout';

import Link from './Link';
import { colors, media } from '../util/style';

const LogoText = styled.div`
  display: inline-block;
  font-weight: 700;
  font-size: 2em;
  color: ${colors.black};
  font-family: 'Montserrat', sans-serif;
  ${media.sm`
    font-size: 1.3em;
  `};
`;

type LogoIconProps = {|
  color: string,
  scale: number,
|};

export const LogoIcon = ({ color, scale }: LogoIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={scale * 145}
    height={scale * 155}
    viewBox="0 0 145 155"
  >
    <g
      fill={color}
      transform="translate(3.5914203383508774, 11.650387970244722) scale(1.326578971581326)"
    >
      <path d="M88.6,23.5l-34.6-20c-2.2-1.3-5-1.3-7.2,0l-34.6,20c-2.2,1.3-3.6,3.7-3.6,6.2v40c0,2.6,1.4,5,3.6,6.2l34.6,20  c1.1,0.6,2.3,1,3.6,1s2.5-0.3,3.6-1l34.6-20c2.2-1.3,3.6-3.7,3.6-6.2v-40C92.2,27.2,90.8,24.8,88.6,23.5z M60.7,31.8  c0-0.2,0.2-0.3,0.4-0.3l1.6-0.2l0.7-1.4c0.1-0.1,0.2-0.2,0.4-0.2c0.2,0,0.3,0.1,0.4,0.2l0.7,1.4l1.6,0.2c0.2,0,0.3,0.2,0.4,0.3  c0,0.2,0,0.4-0.3,0.5l-1.2,1.1l0.3,1.6c0,0.1,0,0.3-0.2,0.4c-0.1,0.1-0.3,0.1-0.5,0l-1.4-0.7l-1.4,0.7c0,0-0.1,0-0.2,0  c-0.1,0-0.2,0-0.3-0.1c-0.1-0.1-0.2-0.2-0.2-0.4l0.3-1.6l-1.2-1.1C60.7,32.1,60.7,32,60.7,31.8z M60.2,48.5c0-0.1,0.1-0.2,0.2-0.2  l1.1-0.1l0.5-1c0-0.1,0.1-0.1,0.3-0.1c0.1,0,0.2,0,0.3,0.1l0.5,1l1.1,0.1c0.1,0,0.2,0.1,0.2,0.2c0,0.1,0,0.2-0.1,0.3l-0.8,0.8  l0.2,1.1c0,0.1,0,0.2-0.1,0.3c-0.1,0.1-0.2,0.1-0.3,0l-1-0.5l-1,0.5c0,0-0.1,0-0.1,0c-0.1,0-0.1,0-0.2,0c-0.1,0-0.1-0.2-0.1-0.3  l0.2-1.1l-0.8-0.8C60.2,48.7,60.1,48.5,60.2,48.5z M51.4,38.4c0-0.1,0.2-0.3,0.3-0.3l1.4-0.2l0.6-1.3c0-0.1,0.2-0.2,0.3-0.2  c0.2,0,0.3,0.1,0.3,0.2l0.6,1.3l1.4,0.2c0.1,0,0.3,0.1,0.3,0.3c0,0.1,0,0.3,0,0.3l-1,1l0.2,1.4c0,0.1,0,0.3-0.1,0.4  c-0.1,0.1-0.3,0.1-0.4,0l-1.3-0.7l-1.3,0.7c0,0-0.1,0-0.2,0c-0.1,0-0.1,0-0.3,0c-0.1-0.1-0.2-0.2-0.1-0.4l0.2-1.4l-1-1  C51.4,38.7,51.3,38.5,51.4,38.4z M50.7,72.6c-12.5,0-22.7-10.2-22.7-22.7c0-11.2,8.1-20.5,18.8-22.3c-3.8,3.7-6.3,9-6.3,14.8  c0,11.3,9.2,20.6,20.6,20.6c3.4,0,6.6-0.8,9.5-2.3C66.9,67.8,59.4,72.6,50.7,72.6z" />
    </g>
  </svg>
);
LogoIcon.defaultProps = {
  color: colors.blue,
  scale: 0.4,
};

type Props = {
  to: string,
};

// Note: this is responsive for Navbar.
// Might require refactor if used in multiple places.
const LogoCore = (
  <Flex align="center" justify="center">
    <LogoIcon />
    <LogoText>CryptoInsomnia</LogoText>
  </Flex>
);

export const Logo = ({ to }: Props) => (
  <Flex>
    {to != null ? (
      <Link href={to} underlineTextDecoration={false}>
        {LogoCore}
      </Link>
    ) : (
      { LogoCore }
    )}
  </Flex>
);
