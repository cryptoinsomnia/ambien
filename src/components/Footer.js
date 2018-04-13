// @flow
import React from 'react';

import { Flex, Box } from './Layout';
import { LogoIcon } from './Logo';
import Link from './Link';

const Footer = () => (
  <Flex white direction="row" justify="center" p={3}>
    <Box mx={2}>
      <LogoIcon scale={0.1} />
      <i>Copyright © 2018 CryptoInsomnia </i>
    </Box>
    |
    <Box mx={2}>
      <Link href={'/privacy'}>Privacy Policy</Link>
    </Box>
    |
    <Box mx={2}>
      <Link href={'/feedback'}>Feedback</Link>
    </Box>
  </Flex>
);

export default Footer;
