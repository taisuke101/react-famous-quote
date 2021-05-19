import { useRouter } from 'next/router';
import { VFC } from 'react';
import ReactTooltip from 'react-tooltip';

import {
	GetFavoritsDocument,
	GetToptenQuotesDocument,
	QuoteResponseFragment,
	useCreateFavoriteMutation,
	useLikeQuoteMutation,
} from '../../generated/graphql';
import { updateAfterLike } from '../../utils/updateAfterLike';
import { updateAfterFavorite } from '../../utils/updateAfterFavorite';

import { AiFillHeart } from 'react-icons/ai';
import { RiHeartAddLine } from 'react-icons/ri';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

interface LikeAndFavoriteProps {
	quote: QuoteResponseFragment;
}

const LikeAndFavorite: VFC<LikeAndFavoriteProps> = ({ quote }) => {
	const numberQuoteId = parseInt(quote.id);

	const router = useRouter();

	const [like] = useLikeQuoteMutation({
		onError: () =>
			router.push({
				pathname: '/login',
				query: {
					errorMessage: '*いいね機能を使用するにはログインする必要があります。',
				},
			}),
	});

	const [createFavorite] = useCreateFavoriteMutation({
		onError: () =>
			router.push({
				pathname: '/login',
				query: {
					errorMessage:
						'*ストック機能を使用するにはログインする必要があります。',
				},
			}),
	});

	return (
		<section className='flex justify-center space-x-5'>
			<section className='p-2 bg-transparent rounded-full'>
				{quote.likeStatus === 1 ? (
					<button
						className='flex focus:outline-none'
						data-testid='いいね！を取り消す'
						data-tip='いいね！を取り消す'
						onClick={() => {
							like({
								variables: {
									quoteId: numberQuoteId,
									value: -1,
								},
								update: (cache) => updateAfterLike(-1, numberQuoteId, cache),
								refetchQueries: [{ query: GetToptenQuotesDocument }],
							});
						}}
					>
						<AiFillHeart className='text-3xl text-red-500' />
						<span className='ml-1 text-xl text-red-500'>{quote.likeCount}</span>
						<ReactTooltip effect='solid' />
					</button>
				) : (
					<button
						className='flex focus:outline-none'
						data-testid='いいね！する'
						data-tip='いいね！する'
						onClick={() => {
							like({
								variables: {
									quoteId: numberQuoteId,
									value: 1,
								},
								update: (cache) => updateAfterLike(1, numberQuoteId, cache),
								refetchQueries: [{ query: GetToptenQuotesDocument }],
							});
						}}
					>
						<RiHeartAddLine className='text-3xl text-red-500' />
						<span className='ml-1 text-xl text-red-500'>{quote.likeCount}</span>
						<ReactTooltip effect='solid' />
					</button>
				)}
			</section>
			<section className='flex p-2 bg-transparent rounded-full'>
				{quote.hasFavorite ? (
					<button
						className='flex focus:outline-none'
						data-testid='ストックから外す'
						data-tip='ストックから外す'
						onClick={() =>
							createFavorite({
								variables: { quoteId: numberQuoteId },
								update: (cache) =>
									updateAfterFavorite(false, numberQuoteId, cache),
								refetchQueries: [{ query: GetFavoritsDocument }],
							})
						}
					>
						<BsBookmarkFill className='text-3xl text-blue-500' />
						<ReactTooltip effect='solid' />
					</button>
				) : (
					<button
						className='flex focus:outline-none'
						data-testid='名言をストックする'
						data-tip='名言をストックする'
						onClick={() =>
							createFavorite({
								variables: { quoteId: numberQuoteId },
								update: (cache) =>
									updateAfterFavorite(true, numberQuoteId, cache),
								refetchQueries: [{ query: GetFavoritsDocument }],
							})
						}
					>
						<BsBookmarkPlus className='text-3xl text-blue-500' />
						<ReactTooltip effect='solid' />
					</button>
				)}
			</section>
		</section>
	);
};
export default LikeAndFavorite;
