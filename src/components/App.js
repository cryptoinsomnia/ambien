// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import Layout from './Layout';
import Main from './Main';
import Footer from './Footer';
import Header from './Header';
import client from '../util/client';

const App = () => (
  <ApolloProvider client={client}>
    <Layout>
      <Header />
      <Router>
        <div>
          <Route exact path="/" component={Main} />
        </div>
      </Router>
      <Footer />
    </Layout>
  </ApolloProvider>
);

export default App;
