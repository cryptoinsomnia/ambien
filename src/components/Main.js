// @flow
import React from 'react';
import { graphql } from 'react-apollo';
import { compose, branch, renderComponent } from 'recompose';
import gql from 'graphql-tag';

import List, { type SubmissionInfo } from './List';
import { Box } from './Layout';

type Props = {|
  submissions: Array<SubmissionInfo>,
|};

// Stateless component for loading state (to avoid if-statement within Main component)
const MainLoading = () => <Box mx={2}> ...Loading </Box>;

const Main = ({ submissions }: Props) => (
  <Box mx={2}>
    <List dataSource={submissions} />
  </Box>
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

// Display the MainLoading component when isLoading is true.
const displayLoadingState = branch(
  ({ isLoading }) => isLoading,
  renderComponent(MainLoading)
);

export default compose(withData, displayLoadingState)(Main);
