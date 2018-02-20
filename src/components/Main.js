// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { Spin, Radio } from 'antd';
import gql from 'graphql-tag';
import { withState, compose } from 'recompose';

import Post from './Post';
import '../fragments/PostFragment';
import PostList from './PostList';
import Button from './Button';
import { Flex, Island } from './Layout';
import { type PostType } from '../types/api';

type FeedType = 'trending' | 'recent';
type Props = {|
  posts: Array<PostType>,
  paginate: () => void,
  feedType: FeedType,
  setFeedType: FeedType => {},
  isLoading: boolean,
|};

const Main = ({ posts, paginate, isLoading, feedType, setFeedType }: Props) => (
  <Flex align="center" direction="column">
    <Flex mt={3} boxShadow>
      <Radio.Group
        value={feedType}
        onChange={e => setFeedType(e.target.value)}
        size="large"
      >
        <Radio.Button value="trending">Trending</Radio.Button>
        <Radio.Button value="recent">Recent</Radio.Button>
      </Radio.Group>
    </Flex>
    <Island my={3} maxWidth="1400px" width={[0.95, 0.95, 0.9, 0.85]}>
      <PostList posts={posts} />
      <Flex mt={2} direction="column" align="center">
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Button size="large" onClick={paginate}>
            Load More
          </Button>
        )}
      </Flex>
    </Island>
  </Flex>
);

Main.defaultProps = {
  posts: [],
};

// The AllPosts graphql query
const Feed = gql`
  query Feed($first: Int!, $orderBy: PostOrderByInput!) {
    feed(orderBy: $orderBy, first: $first) {
      ...PostData
    }
  }
  ${Post.fragments.post}
`;

// graphql(Query) returns a Higher Order Component that injects the result of Query into the Component
// to which it is applied. Takes an options argument.
const withData = graphql(Feed, {
  options: ({ feedType }) => ({
    variables: {
      first: 10,
      // Just a POC, the actual logic will be different.
      orderBy: feedType === 'trending' ? 'createdAt_DESC' : 'createdAt_ASC',
    },
    notifyOnNetworkStatusChange: true,
  }),
  props: ({ data: { loading, feed, fetchMore } }) => ({
    isLoading: loading,
    posts: feed,
    paginate: () =>
      fetchMore({
        variables: { first: feed.length + 10 },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return fetchMoreResult;
        },
      }),
  }),
});

const withFeedTypeState = withState('feedType', 'setFeedType', 'trending');

export default compose(withFeedTypeState, withData)(Main);
