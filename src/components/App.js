// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Layout from './Layout';
import Main from './Main';
import Footer from './Footer';
import Header from './Header';

const App = () => (
  <Layout>
    <Header />
    <Router>
      <div>
        <Route exact path="/" component={Main} />
      </div>
    </Router>
    <Footer />
  </Layout>
);

export default App;
