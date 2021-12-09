import { ApolloClient, ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import Header from '../components/Header';
import { cache } from '../utils/cache';
const Sidebar = dynamic(import('../components/Sidebar'));
const Footer = dynamic(import('../components/Footer'));

import '../styles/globals.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	credentials: 'include',
	cache,
});

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
	return (
		<ApolloProvider client={client}>
			<Header />
			<Sidebar />
			<div className='pt-20 bg-white'>
				<Component {...pageProps} />
			</div>
			<Footer />
		</ApolloProvider>
	);
}

export default MyApp;
