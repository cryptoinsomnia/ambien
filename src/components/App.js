// @flow
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Layout } from 'antd';

import Main from './Main';
import Footer from './Footer';
import Header from './Header';

const { Content } = Layout;

const App = () => (
  <Layout>
    <Header />
    <Router>
      <Content>
        <Route exact path="/" component={Main} />
      </Content>
    </Router>
    <Footer />
  </Layout>
);

export default App;
