import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import App from './components/App';
import client from './util/client';
import PostDetails from './components/PostDetails';
import Profile from './components/Profile';

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={App} />
        <Route
          path="/post/:id"
          render={id => <PostDetails id={id.match.params.id} />}
        />
        <Route
          path="/user/:id"
          render={id => <Profile id={id.match.params.id} />}
        />
        <Route exact path="/user" component={Profile} />
      </Switch>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
