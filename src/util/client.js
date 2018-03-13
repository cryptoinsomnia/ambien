import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, concat } from 'apollo-link';

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: `Bearer ${localStorage.getItem('graphcoolToken')}`,
    },
  });
  return forward(operation);
});

const httpLink = new HttpLink({ uri: process.env.REACT_APP_API_ENDPOINT });

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: object => object.id,
  }),
});

export default client;
