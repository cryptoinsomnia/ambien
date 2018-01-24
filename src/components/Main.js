// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { compose, branch, renderComponent } from 'recompose';
import gql from 'graphql-tag';

import { Flex, Box, Island } from './Layout';

// Stateless component for loading state (to avoid if-statement within Main component)
const LoadingMain = () => <Box mx={2}> ...Loading </Box>;

const Main = () => (
  <Flex justify="center">
    <Island my={3}>
      <div> 1. Thing </div>
      <div> 2. Thing </div>
      <div> 3. Thing </div>
    </Island>
  </Flex>
);

// The AllPosts graphql query
const AllPosts = gql`
  query AllPosts {
    allPosts {
      id
      title
      url
      author {
        username
      }
      comments {
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
    submissions: allPosts,
  }),
});

// Display the LoadingMain component when isLoading is true.
const displayLoadingState = branch(
  ({ isLoading }) => isLoading,
  renderComponent(LoadingMain)
);

export default compose(withData, displayLoadingState)(Main);
