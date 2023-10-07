import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ApolloClient, HttpLink, InMemoryCache, ApolloProvider, split} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';


const getToken = () => {
  const token = localStorage.getItem('user-token');
  console.log('token', token);
  return token ? `bearer ${token}` : null;
}

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  headers: {
    authorization: getToken(),
  }
});

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/graphql',
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
/*
Although Apollo Client can use your GraphQLWsLink to execute all operation types, in most cases it should continue using HTTP for queries and mutations. This is because queries and mutations don't require a stateful or long-lasting connection, making HTTP more efficient and scalable if a WebSocket connection isn't already present.
To support this, the @apollo/client library provides a split function that lets you use one of two different Links, according to the result of a boolean check.
The following example expands on the previous one by initializing both a GraphQLWsLink and an HttpLink. It then uses the split function to combine those two Links into a single Link that uses one or the other according to the type of operation being executed.
 */
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: splitLink
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
);
