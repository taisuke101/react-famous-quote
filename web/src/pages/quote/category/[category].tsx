import { VFC } from 'react';
import { useRouter } from 'next/router';
import { useGetQuoteQuery } from '../../../generated/graphql';
import Loader from 'react-loader-spinner';
import QuoteCard from '../../../components/QuoteCard';

interface CategoryProps {}

const Category: VFC<CategoryProps> = ({}) => {
	const router = useRouter();
	const category = router.query.category;

	const { data, loading } = useGetQuoteQuery({
		variables: {
			category: category as string,
		},
	});

	return (
		<>
			{!data && loading ? (
				<div className='flex justify-center'>
					<h1>Loading....</h1>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<div className='text-center'>
					<h1 className='mb-4 text-4xl'>
						{`カテゴリー「${category}」の名言`}...
						<span className='text-red-500'>{data.getQuote.length}</span>件
					</h1>
					{data.getQuote.map((quote) => (
						<div key={quote.id}>
							<QuoteCard quote={quote} wiki={true} />
						</div>
					))}
				</div>
			)}
		</>
	);
};
export default Category;
