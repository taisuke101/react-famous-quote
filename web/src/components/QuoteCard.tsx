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
		<div className='px-10 py-5 mx-20 mb-5 space-y-5 text-center bg-gray-100 shadow-md'>
			<div className='font-serif text-xl font-bold tracking-widest break-words'>
				{quote.text}
			</div>
			<section className='inline-flex flex-col space-y-5'>
				<Link href={`/quote/author/${quote.author}`}>
					<a className='text-xl font-semibold transition duration-500 transform hover:text-green-500'>
						{quote.author}
					</a>
				</Link>
				<Link href={`/quote/country/${quote.country}`}>
					<a className='text-lg transition duration-500 transform hover:text-green-500'>
						{quote.country}
					</a>
				</Link>
				<div>{quote.job}</div>
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
