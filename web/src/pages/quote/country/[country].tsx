import { VFC } from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { useGetQuoteQuery } from '../../../generated/graphql';
import QuoteCard from '../../../components/QuoteCard';
import SEO from '../../../components/SEO';

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
		<div className='mb-56'>
			<SEO
				siteTitle={`${country}出身者の名言`}
				title={`${country}出身者の名言`}
				description={`${country}出身者の名言を表示するページです`}
			/>
			{!data && loading ? (
				<div className='flex justify-center'>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<>
					<h1
						style={{ fontFamily: 'Kiwi Maru' }}
						className='mb-4 text-3xl text-center md:text-4xl lg:text-5xl mt-9'
					>
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
		</div>
	);
};
export default Country;
