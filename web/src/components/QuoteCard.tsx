import { VFC } from 'react';
import Link from 'next/link';
import ReactTooltip from 'react-tooltip';

import LikeAndFavorite from './parts/LikeAndFavorite';
import { QuoteResponseFragment } from '../generated/graphql';

interface QuoteCardProps {
	quote: QuoteResponseFragment;
	index?: number;
	wiki: boolean;
}

const QuoteCard: VFC<QuoteCardProps> = ({ quote, wiki }) => {
	return (
		<div className='px-4 mx-10 mb-5 space-y-5 text-center bg-gray-100 shadow-md rounded-2xl py-7 lg:mx-20 lg:py-5 lg:px-10'>
			<div className='font-serif text-xl font-bold tracking-widest break-words'>
				{quote.text}
			</div>
			<section className='inline-flex flex-col space-y-5'>
				<Link href={`/quote/author/${quote.author}`}>
					<a className='text-xl font-bold transition duration-500 transform hover:text-green-500'>
						{quote.author}
					</a>
				</Link>
				<Link href={`/quote/country/${quote.country}`}>
					<a className='font-mono text-lg font-medium transition duration-500 transform hover:text-green-500'>
						{quote.country}
					</a>
				</Link>
				<div className='font-mono font-semibold'>{quote.job}</div>
				<LikeAndFavorite quote={quote} />
				{wiki && (
					<div data-tip={`Wikipediaで${quote.author}を検索する`}>
						<Link href={`https://ja.wikipedia.org/wiki/${quote.author}`}>
							<a className='text-base transition duration-500 transform hover:text-green-500'>
								wikipedia
							</a>
						</Link>
						<ReactTooltip effect='solid' />
					</div>
				)}
			</section>
		</div>
	);
};
export default QuoteCard;
