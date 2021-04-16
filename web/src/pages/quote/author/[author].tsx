import { VFC } from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { useGetQuoteQuery } from '../../../generated/graphql';
import LikeAndFavorite from '../../../components/LikeAndFavorite';

interface AuthorProps {

}

const Author: VFC<AuthorProps> = ({}) => {
    const router = useRouter();
    const author = router.query.author;

    const { data, loading } = useGetQuoteQuery({
        variables: {
            author: author as string,
            country: null,
            job: null
        }
    });
    
    return (
        <div className='pt-24'>
            <h1 className='mb-4 text-4xl text-center'>{`${author}の名言一覧`}</h1>
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
                    {data.getQuote.map(quote => {
                        return (
                            <div className='p-4 m-4 space-y-5 text-center bg-gray-500'>
                                <div>{quote.text}</div>
                                <LikeAndFavorite 
                                    quote={quote}
                                />
                            </div>
                        )})
                    }
                </>
            )
            }
        </div>
    );
}
export default Author;