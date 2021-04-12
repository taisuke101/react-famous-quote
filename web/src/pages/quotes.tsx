import { FC } from 'react'
import Link from 'next/link';

import { useGetQuotesQuery } from '../generated/graphql';

interface QuoteProps {

}

const Quotes: FC<QuoteProps> = ({}) => {
    const { data, loading, fetchMore, variables } = useGetQuotesQuery({
        variables: {
            limit: 10,
            cursor: null,
        }
    });
    
    if (!loading && !data) {
        return (
            <>
                <div>データの取得に失敗しました。</div>
                <Link href='/'>
                    <a>ホームに戻る</a>
                </Link>
            </>
        )
    }
    
    return (
        <div className='pt-24'>
            {!data && loading 
            ? (<div>loading...</div>) 
            : (
                <>
                    { data.getQuotes.quotes.map(quote => {
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
                                </section>
                            </div>
                        )
                    })}
                </>
                )
            }
            <button
                onClick={async () => {
                    await fetchMore({
                        variables: {
                            limit: variables?.limit,
                            cursor: data.getQuotes.quotes[data.getQuotes.quotes.length -1].id
                        }
                    })
                }}
            >
                さらに読み込む
            </button>
        </div>
    );
}
export default Quotes;