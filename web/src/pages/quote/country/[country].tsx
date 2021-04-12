import { VFC } from 'react';
import { useRouter } from 'next/router';

import { useGetQuoteQuery } from '../../../generated/graphql';

interface CountryProps {

}

const Country: VFC<CountryProps> = ({}) => {
    const router = useRouter();
    const country = router.query.country;

    const { data, loading } = useGetQuoteQuery({
        variables: {
            author: null,
            country: country as string,
            job: null
        }
    });

    console.log(data);
    
    return (
        <div className='pt-24'>
            <h1 className='mb-4 text-4xl text-center'>{`${country}出身者の名言一覧`}</h1>
            {!data && loading 
            ? (<div>loading...</div>) 
            : (
                <>
                    {data.getQuote.map(quote => {
                        return (
                            <>
                                <div>{quote.text}</div>
                                <div>{quote.author}</div>
                                <div>{quote.job}</div>
                            </>
                        )
                    })
                    }
                </>
            )
            }
        </div>
    );
}
export default Country;