// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { compose, branch, renderComponent } from 'recompose';
import gql from 'graphql-tag';

import Post from './Post';
import { Flex, Box, Island } from './Layout';
import { type FeedPost } from '../types/api';

// Stateless component for loading state (to avoid if-statement within Main component)
const LoadingMain = () => <Box mx={2}> ...Loading </Box>;

type Props = {|
  posts: Array<FeedPost>,
|};

const Main = ({ posts }: Props) => (
  <Flex justify="center">
    <Island my={3} maxWidth="95%">
      {posts.map((post, index) => (
        <Box key={post.id} borderBottom py={2}>
          <Post rank={index + 1} {...post} />
        </Box>
      ))}
    </Island>
  </Flex>
);

Main.defaultProps = {
  posts: [],
};

// The AllPosts graphql query
const AllPosts = gql`
  query AllPosts {
    allPosts {
      id
      title
      url
      createdAt
      author {
        username
      }
      comments {
        id
      }
      votes {
        id
      }
    }
  }
`;

// graphql(Query) returns a Higher Order Component that injects the result of Query into the Component
// to which it is applied. Takes an options argument.
const withData = graphql(AllPosts, {
  props: ({ data: { loading, allPosts } }) => ({
    isLoading: loading,
    posts: allPosts,
  }),
});

// Display the LoadingMain component when isLoading is true.
const displayLoadingState = branch(
  ({ isLoading }) => isLoading,
  renderComponent(LoadingMain)
);

export default compose(withData, displayLoadingState)(Main);
