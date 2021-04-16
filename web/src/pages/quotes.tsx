import { FC } from 'react'
import Link from 'next/link';
import Loader from 'react-loader-spinner';

import { useGetQuotesQuery } from '../generated/graphql';
import QuoteCard from '../components/QuoteCard';

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
        <div className='py-24 text-center'>
            {!data && loading 
            ? (
                <div className='flex justify-center'>
                    <h1>Loading....</h1>
                    <Loader 
                        type="TailSpin" 
                        color="#00fa9a" 
                        height={200} 
                        width={200} 
                    />
                </div>
            ) 
            : (
                <>
                    { data?.getQuotes.quotes.map(quote => (
                        <QuoteCard 
                            quote={quote}
                        />
                    ))}
                    <button
                        className='px-6 py-2 mx-auto mt-2 text-lg font-semibold tracking-widest text-white transition duration-500 transform bg-green-400 rounded-lg hover:text-black hover:bg-green-600'
                        onClick={async () => {
                            await fetchMore({
                                variables: {
                                    limit: variables?.limit,
                                    cursor: data?.getQuotes.quotes[data.getQuotes.quotes.length -1].id
                                }
                            })
                        }}
                    >
                        さらに読み込む
                    </button>
                </>
                )
            }
        </div>
    );
}
export default Quotes;