import { useRouter } from 'next/router';
import { VFC } from 'react';

import { 
    GetFavoritsDocument,
    GetToptenQuotesDocument,
    QuoteResponseFragment, 
    useCreateFavoriteMutation, 
    useLikeQuoteMutation 
} from '../generated/graphql';
import { updateAfterLike } from '../utils/updateAfterLike';
import { updateAfterFavorite } from '../utils/updateAfterFavorite';

import { AiFillHeart } from 'react-icons/ai'
import { RiHeartAddLine } from 'react-icons/ri';
import { BsBookmarkPlus, BsBookmarkFill } from 'react-icons/bs';

interface LikeAndFavoriteProps {
    quote: QuoteResponseFragment
}

const LikeAndFavorite: VFC<LikeAndFavoriteProps> = ({ quote }) => {
    const numberQuoteId = parseInt(quote.id);

    const router = useRouter();

    const [ like ] = useLikeQuoteMutation({
        onError: () => router.push({
            pathname: '/login',
            query: {
                errorMessage: 
                'いいね機能を使用するにはログインする必要があります。'
            }
        }),
    });

    const [ createFavorite ] = useCreateFavoriteMutation({
        onError: () => router.push({
            pathname: '/login',
            query: {
                errorMessage:
                'ストック機能を使用するにはログインする必要があります。'
            }
        }),
    });

    return (
        <section className='flex justify-center space-x-5'>
        <section className='p-2 bg-white rounded-lg'>
            { quote.likeStatus === 1 ? (
                    <button 
                        className='flex'
                        onClick={() => {like({
                            variables: {
                                quoteId: numberQuoteId,
                                value: -1
                            },
                            update: (cache) => updateAfterLike(-1, numberQuoteId, cache),
                            refetchQueries: [{query: GetToptenQuotesDocument}]
                            })
                        }}
                    >
                        <AiFillHeart className='text-3xl text-red-500'/>
                        <span className='ml-1 text-xl text-red-500'>
                            {quote.likeCount}
                        </span>
                        <span className='ml-2 text-xl'>
                            取り消し
                        </span>
                    </button>
                ): (
                    <button 
                        className='flex'
                        onClick={() => {like({
                            variables: {
                                quoteId: numberQuoteId,
                                value: 1
                            },
                            update: (cache) => updateAfterLike(1, numberQuoteId, cache),
                            refetchQueries: [{query: GetToptenQuotesDocument}]
                            })
                        }}
                    >
                        <RiHeartAddLine className='text-3xl text-red-500' />
                        <span className='ml-1 text-xl text-red-500'>
                            {quote.likeCount}
                        </span>
                        <span className='ml-2 text-xl'>
                            いいね！する
                        </span>
                    </button>
                )
            }
            
        </section>
        <section className='flex p-2 bg-white rounded-lg'>
            { quote.hasFavorite ? (
                    <button 
                        className='flex'
                        onClick={() => createFavorite({
                            variables: { quoteId: numberQuoteId},
                            update: (cache) => updateAfterFavorite(false, numberQuoteId, cache),
                            refetchQueries: [{ query: GetFavoritsDocument }]
                        })}
                    >
                        <BsBookmarkFill className='text-3xl text-blue-500' />
                        <span className='ml-2 text-xl'>
                            ストックから外す
                        </span>
                    </button>
                ) : (
                    <button 
                        className='flex'
                        onClick={() => createFavorite({
                            variables: { quoteId: numberQuoteId},
                            update: (cache) => updateAfterFavorite(true, numberQuoteId, cache),
                            refetchQueries: [{ query: GetFavoritsDocument }]
                        })}
                    >
                        <BsBookmarkPlus className='text-3xl text-blue-500' /> 
                        <span className='ml-2 text-xl'>
                            名言をストック
                        </span>
                    </button>
                )
            }
        </section>
    </section>
    );
}
export default LikeAndFavorite;