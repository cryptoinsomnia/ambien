// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import Layout from './Layout';
import Main from './Main';
import PostDetails from './PostDetails';
import Profile from './Profile';
import Footer from './Footer';
import Header from './Header';
import client from '../util/client';

const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Main} />
          <Route path="/post/:id" render={(id) => (
            <PostDetails id={id.match.params.id} />
          )}/>
          <Footer />
          <Route exact path="/profile" component={Profile} />
        </div>
      </Router>
    </Layout>
  </ApolloProvider>
);

export default App;
