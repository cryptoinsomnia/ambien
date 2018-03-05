//@flow
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    me {
      id
      name
      username
      email
      profileImageUrl
      about
    }
  }
`;

const loggedInUser = graphql(LOGGED_IN_USER, {
  props: ({ data: { loading, me } }) => ({
    loggedInUser: loading ? null : me,
  }),
});

export default loggedInUser;
