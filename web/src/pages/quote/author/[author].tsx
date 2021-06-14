import { VFC } from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import Link from 'next/link';

import { useGetQuoteQuery } from '../../../generated/graphql';
import QuoteCard from '../../../components/QuoteCard';

interface AuthorProps {}

const Author: VFC<AuthorProps> = ({}) => {
	const router = useRouter();
	const author = router.query.author;

	const { data, loading } = useGetQuoteQuery({
		variables: {
			author: author as string,
		},
	});

	return (
		<>
			{!data && loading ? (
				<div className='flex justify-center'>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<div className='text-center mt-9'>
					<h1 className='mb-4 text-3xl md:text-4xl lg:text-5xl'>
						{`${author}の名言`}...
						<span className='text-red-500'>{data.getQuote.length}</span>件
					</h1>
					<Link href={`https://ja.wikipedia.org/wiki/${author}`}>
						<a className='text-base'>wikipedia</a>
					</Link>
					{data.getQuote.map((quote) => (
						<div key={quote.id}>
							<QuoteCard quote={quote} wiki={false} />
						</div>
					))}
				</div>
			)}
		</>
	);
};
export default Author;
