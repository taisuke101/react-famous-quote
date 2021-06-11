import { VFC } from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { useGetQuoteQuery } from '../../../generated/graphql';
import QuoteCard from '../../../components/QuoteCard';

interface CountryProps {}

const Country: VFC<CountryProps> = ({}) => {
	const router = useRouter();
	const country = router.query.country;

	const { data, loading } = useGetQuoteQuery({
		variables: {
			country: country as string,
		},
	});

	console.log(data);

	return (
		<>
			{!data && loading ? (
				<div className='flex justify-center'>
					<h1>Loading....</h1>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<>
					<h1 className='mb-4 text-3xl text-center md:text-4xl lg:text-5xl mt-9'>
						{`${country}出身者の名言`}...
						<span className='text-red-500'>{data.getQuote.length}</span>件
					</h1>
					{data.getQuote.map((quote) => (
						<div key={quote.id}>
							<QuoteCard quote={quote} wiki={true} />
						</div>
					))}
				</>
			)}
		</>
	);
};
export default Country;
