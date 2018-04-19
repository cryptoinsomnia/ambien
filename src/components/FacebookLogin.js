// @flow
import React from 'react';
import { graphql, type MutationFunc } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';

const LoginButton = styled.button`
  box-sizing: border-box;
  position: relative;
  margin: 0.2em;
  padding: 0 15px 0 46px;
  border: none;
  text-align: left;
  line-height: 34px;
  white-space: nowrap;
  border-radius: 0.2em;
  font-size: 16px;
  color: #fff;
  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 34px;
    height: 100%;
  }
  &:focus {
    outline: none;
  }
  &:active {
    box-shadow: inset 0 0 0 32px rgba(0, 0, 0, 0.1);
  }
`;

const FacebookLoginButton = styled(LoginButton)`
  background-color: #4c69ba;
  background-image: linear-gradient(#4c69ba, #3b55a0);
  font-family: 'Helvetica neue', Helvetica Neue, Helvetica, Arial, sans-serif;
  text-shadow: 0 -1px 0 #354c8c;
  &:before {
    border-right: #364e92 1px solid;
    background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_facebook.png')
      6px 6px no-repeat;
  }
  &:hover {
    background-color: #5b7bd5;
    background-image: linear-gradient(#5b7bd5, #4864b1);
  }
  &:focus {
    background-color: #5b7bd5;
    background-image: linear-gradient(#5b7bd5, #4864b1);
  }
`;

/* Google */
/*.loginBtn--google {
  //font-family: "Roboto", Roboto, arial, sans-serif;
  background: #DD4B39;
}
.loginBtn--google:before {
  border-right: #BB3F30 1px solid;
  background: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/14082/icon_google.png') 6px 6px no-repeat;
}
.loginBtn--google:hover,
.loginBtn--google:focus {
  background: #E74B37;
}*/

export type Props = {|
  authenticateUserMutation: MutationFunc<{
    loading: boolean,
    data: {
      authenticateUser: {
        token: string,
      },
    },
  }>,
|};

const FacebookLogin = ({ authenticateUserMutation }: Props) => {
  const _handleFBLogin = () => {
    window.FB.login(
      response => {
        _facebookCallback(response);
      },
      { scope: 'public_profile, email' }
    );
  };

  const _facebookCallback = async facebookResponse => {
    if (facebookResponse.status === 'connected') {
      const facebookToken = facebookResponse.authResponse.accessToken;
      const graphcoolResponse = await authenticateUserMutation({
        variables: { facebookToken },
      });
      const graphcoolToken = graphcoolResponse.data.authenticateFacebook.token;
      localStorage.setItem('graphcoolToken', graphcoolToken);
      window.location.href = '/';
    } else {
      // User didn't authenticate. Maybe gracefully handle? TODO
    }
  };
  return (
    <FacebookLoginButton m={1} onClick={_handleFBLogin}>
      Login with Facebook
    </FacebookLoginButton>
  );
};

const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateFacebook(fbToken: $facebookToken) {
      token
    }
  }
`;

export default graphql(AUTHENTICATE_FACEBOOK_USER, {
  name: 'authenticateUserMutation',
})(FacebookLogin);
