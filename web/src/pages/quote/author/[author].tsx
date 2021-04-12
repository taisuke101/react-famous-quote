import { VFC } from 'react';
import { useRouter } from 'next/router';

import { useGetQuoteQuery } from '../../../generated/graphql';

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
            ? (<div>loading...</div>) 
            : (
                <>
                    {data.getQuote.map(quote => {
                        return (
                            <div>{quote.text}</div>
                        )
                    })
                    }
                </>
            )
            }
        </div>
    );
}
export default Author;