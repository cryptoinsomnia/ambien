/*global FB*/
import React from 'react';
import Button from './Button';
import {withRouter} from 'react-router';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';

type Props = {
  authenticateUserMutation?: ? () => void,
};

const FacebookLogin = ({authenticateUserMutation}: Props) => {
  const _handleFBLogin = () => {
    FB.login (
      response => {
        _facebookCallback (response);
      },
      {scope: 'public_profile, email'}
    );
  };

  const _facebookCallback = async facebookResponse => {
    if (facebookResponse.status === 'connected') {
      const facebookToken = facebookResponse.authResponse.accessToken;
      const graphcoolResponse = await authenticateUserMutation ({
        variables: {facebookToken},
      });
      const graphcoolToken = graphcoolResponse.data.authenticateUser.token;
      localStorage.setItem ('graphcoolToken', graphcoolToken);
      window.location.href = '/';
    } else {
      // User didn't authenticate. Maybe gracefully handle? TODO
    }
  };
  return (
    <Button size="default" m={1} onClick={_handleFBLogin}>
      Login with Facebook
    </Button>
  );
};

const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      token
    }
  }
`;

export default compose (
  graphql (AUTHENTICATE_FACEBOOK_USER, {name: 'authenticateUserMutation'})
) (withRouter (FacebookLogin));
