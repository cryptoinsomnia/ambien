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
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={Main} />
          <Footer />
        </div>
      </Router>
    </Layout>
  </ApolloProvider>
);

export default App;
