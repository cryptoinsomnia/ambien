// @flow
import React from 'react';
import { Flex, Island, Box } from './Layout';
import { Heading } from './Text';

const Feedback = () => (
  <Flex align="center" direction="column">
    <Island my={3} width={[0.95, 0.95, 0.5, 0.4]}>
      <Box borderBottom mb={3}>
        <Heading>Feedback</Heading>
      </Box>
      <Box>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLScRgWx2SD9FuCfUQu_pFUcvVHncp41Uh9DW4ebb3tUjm_s7bw/viewform?embedded=true"
          width="602"
          height="1100"
          frameBorder="0"
          marginHeight="0"
          marginWidth="0"
        >
          Loading...
        </iframe>
      </Box>
    </Island>
  </Flex>
);

export default Feedback;
