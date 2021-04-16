import { VFC } from 'react'
import Link from 'next/link';

import LikeAndFavorite from '../components/LikeAndFavorite'
import { QuoteResponseFragment } from '../generated/graphql';

interface QuoteCardProps {
    quote: QuoteResponseFragment;
    index?: number
};

const QuoteCard: VFC<QuoteCardProps> = ({ quote }) => {
    return (
        <div 
        key={quote.id}
        className='px-10 py-5 mx-20 mb-5 space-y-5 text-center bg-gray-400'
        >
            <div className='font-semibold break-words'>{quote.text}</div>
            <section className='inline-flex flex-col space-y-5'>
                <Link href={`/quote/author/${quote.author}`}>
                    <a className='text-xl'>{quote.author}</a>
                </Link>
                <Link href={`/quote/country/${quote.country}`}>
                    <a className='text-lg'>{quote.country}</a>
                </Link>
                <div>{quote.job}</div>
                <LikeAndFavorite
                    quote={quote}
                />
            </section>
        </div>
    );
}
export default QuoteCard;