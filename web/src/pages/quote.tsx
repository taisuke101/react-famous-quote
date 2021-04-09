import { FC } from 'react'
import { GetQuotesQuery, PaginatedQuotes, useGetQuotesQuery } from '../generated/graphql';

interface QuoteProps {

}

const Quote: FC<QuoteProps> = ({}) => {
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
            </>
        )
    }
    
    return (
        <div className='pt-24'>
            {!data && loading ? (
                <div>loading...</div>
            ) : (
                <div>
                    { data.getQuotes.quotes.map(quote => {
                        return (
                            <div key={quote.id}>
                                <div>{quote.text}</div>
                                <div>{quote.author}</div>
                                <div>{quote.country}</div>
                                <div>{quote.job}</div>
                            </div>
                        )
                    })}
                </div>
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
export default Quote;