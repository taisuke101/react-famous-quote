import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import Header from '../components/Header';

import '../styles/globals.css';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
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
