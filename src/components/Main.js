// @flow
import React from 'react';

import List, { type SubmissionInfo } from './List';
import { Box } from './Layout';

const fakeData: Array<SubmissionInfo> = [
  {
    title: 'The Criminal Underworld Is Dropping Bitcoin for Another Currency',
    url:
      'https://www.bloomberg.com/news/articles/2018-01-02/criminal-underworld-is-dropping-bitcoin-for-another-currency',
    submitter: 'fragosti',
    comments: [],
  },
  {
    title: 'Bitcoin Is The MySpace Of The Cryptocurrency World (Part 1)',
    url:
      'https://seekingalpha.com/article/4135035-bitcoin-myspace-cryptocurrency-world-part-1',
    submitter: 'rgmvisser',
    comments: [],
  },
];

const Main = () => (
  <Box mx={2}>
    <List dataSource={fakeData} />
  </Box>
);

export default Main;
