import { useRouter } from 'next/router';
import { VFC } from 'react';
import Loader from 'react-loader-spinner';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';
import { useSearchQuoteQuery } from '../generated/graphql';

interface SearchProps {}

const Search: VFC<SearchProps> = ({}) => {
	const router = useRouter();

	const { data, loading } = useSearchQuoteQuery({
		variables: {
			searchArgs: router.query.searchArgs as string,
		},
	});

	return (
		<>
			<SEO
				siteTitle='検索結果'
				title='検索結果'
				description='名言の検索結果を表示するページです'
			/>
			{!data && loading ? (
				<div className='flex justify-center'>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<div className='text-center mt-9'>
					<section className='mb-4 text-2xl'>
						キーワード
						<span className='text-2xl font-bold'>
							「”{router.query.searchArgs}”」
						</span>
						での検索結果
						<span className='text-3xl text-red-500'>
							{data.searchQuote.length}
						</span>
						件
					</section>
					{data.searchQuote.map((quote) => (
						<div key={quote.id}>
							<QuoteCard quote={quote} wiki={true} />
						</div>
					))}
				</div>
			)}
		</>
	);
};
export default Search;
