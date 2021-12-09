import { VFC } from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { useGetFavoritsQuery } from '../../generated/graphql';
import QuoteCard from '../../components/QuoteCard';
import SEO from '../../components/SEO';

interface UsernameProps {}

const Username: VFC<UsernameProps> = ({}) => {
	const router = useRouter();

	const username = router.query.username;

	const { data, loading } = useGetFavoritsQuery();

	return (
		<div className='mb-56'>
			<SEO
				siteTitle='ストック一覧'
				title='ストック一覧'
				description='ユーザーがストックした名言を表示するページです'
			/>
			<h1 className='mt-10 mb-5 text-3xl text-center font-kiwi'>
				{username}のストック一覧
			</h1>
			{data && loading ? (
				<div className='flex justify-center'>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<>
					{data?.getFavorits.map((favorite) => {
						const { quote } = favorite;
						return <QuoteCard quote={quote} wiki={false} />;
					})}
				</>
			)}
		</div>
	);
};

export default Username;
