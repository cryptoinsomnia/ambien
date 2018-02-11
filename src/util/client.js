import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClient, createNetworkInterface} from 'react-apollo';

const networkInterface = createNetworkInterface ({
  uri: process.env.REACT_APP_API_ENDPOINT,
});
networkInterface.use ([
  {
    applyMiddleware (req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      // get the authentication token from local storage if it exists
      if (localStorage.getItem ('graphcoolToken')) {
        req.options.headers.authorization = `Bearer ${localStorage.getItem ('graphcoolToken')}`;
      }
      next ();
    },
  },
]);

const client = new ApolloClient ({
  networkInterface,
  cache: new InMemoryCache (),
});

export default client;
