import { ApolloClient, ApolloProvider } from '@apollo/client';

import Header from '../components/Header';
import { cache } from '../utils/cache';

import '../styles/globals.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
  cache,
})

function MyApp({ Component, pageProps }) {
  return(
    <ApolloProvider client={client}>
      <Header />
      <Component {...pageProps} />
    </ApolloProvider>
  ) 
}

export default MyApp
