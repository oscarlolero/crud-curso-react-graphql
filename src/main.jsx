import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {ApolloClient, HttpLink, gql, InMemoryCache, ApolloProvider} from '@apollo/client';


const getToken = () => {
  const token = localStorage.getItem('user-token');
  console.log('token', token);
  return token ? `bearer ${token}` : null;
}
const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000',
    headers: {
      authorization: getToken(),
    }
  }),
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
);
