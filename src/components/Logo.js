// @flow
import React from 'react';
import styled from 'styled-components';

const FakeLogo = styled.div`
  display: inline-block;
  font-weight: 700;
  font-size: 2.5em;
  text-align: center;
  width: 100%;
`;

const Logo = () => <FakeLogo>CryptoInsomnia</FakeLogo>;

export default Logo;
