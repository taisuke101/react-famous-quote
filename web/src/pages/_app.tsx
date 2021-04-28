import { ApolloClient, ApolloProvider } from '@apollo/client';

import Header from '../components/Header';
import { cache } from '../utils/cache';

import '../styles/globals.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Sidebar from '../components/Sidebar';

const client = new ApolloClient({
	uri: 'http://localhost:5000/graphql',
	credentials: 'include',
	cache,
});

function MyApp({ Component, pageProps }) {
	return (
		<ApolloProvider client={client}>
			<Header />
			<Sidebar />
			<div className='pt-24 bg-white'>
				<Component {...pageProps} />
			</div>
		</ApolloProvider>
	);
}

export default MyApp;
