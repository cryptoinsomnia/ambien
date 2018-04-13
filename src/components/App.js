import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import Layout from './Layout';
import Main from './Main';
import Footer from './Footer';
import Header from './Header';
import CreatePost from './CreatePost';
import PostDetails from './PostDetails';
import Profile from './Profile';

import client from '../util/client';
import Privacy from './Privacy';
import Feedback from './Feedback';

const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Main} />
          <Route exact path="/post" component={CreatePost} />
          <Route
            path="/user/:username"
            render={username => (
              <Profile username={username.match.params.username} />
            )}
          />
          <Route
            path="/post/:id"
            render={id => <PostDetails id={id.match.params.id} />}
          />
          <Route exact path="/privacy" component={Privacy} />
          <Route exact path="/feedback" component={Feedback} />
          <Footer />
        </div>
      </Router>
    </Layout>
  </ApolloProvider>
);

export default App;
