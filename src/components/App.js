/*global FB*/
import React from 'react';
import {withRouter} from 'react-router';
import {BrowserRouter as Router} from 'react-router-dom';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {Spin} from 'antd';

import Layout from './Layout';
import Main from './Main';
import Footer from './Footer';
import Header from './Header';

const FACEBOOK_APP_ID = '170993680182314';
const FACEBOOK_API_VERSION = 'v2.11';

class App extends React.Component<Props> {
  componentDidMount () {
    this._initializeFacebookSDK ();
  }

  _initializeFacebookSDK () {
    window.fbAsyncInit = function () {
      FB.init ({
        appId: FACEBOOK_APP_ID,
        cookie: true, // enable cookies to allow the server to access the session
        version: FACEBOOK_API_VERSION,
      });
    };

    // Load the SDK asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName (s)[0];
      if (d.getElementById (id)) return;
      js = d.createElement (s);
      js.id = id;
      js.src = '//connect.facebook.net/en_US/sdk.js';
      if (fjs.parentNode != null) {
        fjs.parentNode.insertBefore (js, fjs);
      }
    }) (document, 'script', 'facebook-jssdk');
  }

  _handleFBLogin = () => {
    FB.login (
      response => {
        this._facebookCallback (response);
      },
      {scope: 'public_profile, email'}
    );
  };

  _facebookCallback = async facebookResponse => {
    if (facebookResponse.status === 'connected') {
      const facebookToken = facebookResponse.authResponse.accessToken;
      const graphcoolResponse = await this.props.authenticateUserMutation ({
        variables: {facebookToken},
      });
      const graphcoolToken = graphcoolResponse.data.authenticateUser.token;
      localStorage.setItem ('graphcoolToken', graphcoolToken);
      window.location.reload ();
    } else {
      // User didn't authenticate. Maybe gracefully handle? TODO
    }
  };

  _isLoggedIn = () => {
    return (
      this.props.data.loggedInUser && this.props.data.loggedInUser.id !== ''
    );
  };

  _logout = () => {
    localStorage.removeItem ('graphcoolToken');
    window.location.reload ();
  };

  render () {
    if (this.props.data.loading) {
      return <div><Spin size="large" /></div>;
    }

    return (
      <Layout>
        <Router>
          <div>
            <Header isLoggedIn={this._isLoggedIn ()} />
            <Main />
            <Footer />
          </div>
        </Router>
      </Layout>
    );
  }

  renderLoggedIn () {
    return (
      <Layout>
        <Router>
          <div>
            <Header />
            <div>
              <span>
                Logged in as ${this.props.data.loggedInUser.id}
              </span>
              <div className="pv3">
                <span
                  className="dib bg-red white pa3 pointer dim"
                  onClick={this._logout}
                >
                  Logout
                </span>
              </div>
            </div>
            <Main />
            <Footer />
          </div>
        </Router>
      </Layout>
    );
  }

  renderLoggedOut () {
    return (
      <Layout>
        <Router>
          <div>
            <Header />
            <div className="pv3">
              <div>
                <span
                  onClick={this._handleFBLogin}
                  className="dib pa3 white bg-blue dim pointer"
                >
                  Log in with Facebook
                </span>
              </div>
            </div>
            <Main />
            <Footer />
          </div>
        </Router>
      </Layout>
    );
  }
}

const AUTHENTICATE_FACEBOOK_USER = gql`
  mutation AuthenticateUserMutation($facebookToken: String!) {
    authenticateUser(facebookToken: $facebookToken) {
      token
    }
  }
`;

const LOGGED_IN_USER = gql`
  query LoggedInUser {
    loggedInUser {
      id
    }
  }
`;

export default compose (
  graphql (AUTHENTICATE_FACEBOOK_USER, {name: 'authenticateUserMutation'}),
  graphql (LOGGED_IN_USER, {options: {fetchPolicy: 'network-only'}})
) (withRouter (App));
