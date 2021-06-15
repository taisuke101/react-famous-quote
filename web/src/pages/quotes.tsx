import { FC } from 'react';
import Link from 'next/link';
import Loader from 'react-loader-spinner';

import { useGetQuotesQuery } from '../generated/graphql';
import QuoteCard from '../components/QuoteCard';
import SEO from '../components/SEO';

interface QuoteProps {}

const Quotes: FC<QuoteProps> = ({}) => {
	const { data, loading, fetchMore, variables } = useGetQuotesQuery({
		variables: {
			limit: 10,
			cursor: null,
		},
	});

	if (!loading && !data) {
		return (
			<>
				<div>データの取得に失敗しました。</div>
				<Link href='/'>
					<a>ホームに戻る</a>
				</Link>
			</>
		);
	}

	return (
		<div className='pb-24 text-center mt-9'>
			<SEO
				siteTitle='名言一覧'
				title='名言一覧'
				description='名言一覧のページです'
			/>
			{!data && loading ? (
				<div className='flex justify-center'>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<>
					<h1
						style={{ fontFamily: 'Kiwi Maru' }}
						className='mb-8 text-3xl text-center'
					>
						名言一覧
					</h1>
					{data?.getQuotes.quotes.map((quote) => (
						<div key={quote.id}>
							<QuoteCard quote={quote} wiki={true} />
						</div>
					))}
					<button
						style={{ fontFamily: 'Kiwi Maru' }}
						className='px-6 py-2 mx-auto mt-2 text-lg font-semibold tracking-widest text-white transition duration-500 transform bg-green-400 rounded-lg hover:text-black hover:bg-green-600 focus:outline-none'
						onClick={async () => {
							await fetchMore({
								variables: {
									limit: variables?.limit,
									cursor:
										data?.getQuotes.quotes[data.getQuotes.quotes.length - 1].id,
								},
							});
						}}
					>
						さらに読み込む
					</button>
				</>
			)}
		</div>
	);
};
export default Quotes;
