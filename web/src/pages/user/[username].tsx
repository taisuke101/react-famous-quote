import { VFC } from 'react';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { useGetFavoritsQuery } from '../../generated/graphql'
import QuoteCard from '../../components/QuoteCard';

interface UsernameProps {

}

const Username: VFC<UsernameProps> = ({}) => {
    const router = useRouter();

    const username = router.query.username;

    const { data, loading } = useGetFavoritsQuery();

    return (
        <>
            <h1 className='text-2xl text-center'>{username}のストック一覧</h1>
            { data && loading 
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
                    {data?.getFavorits.map(favorite => {
                        const { quote } = favorite;
                        return (
                            <QuoteCard 
                                quote={quote}
                                wiki={false}
                            />
                        )
                    })
                    }
                </>
                )
            }
        </>
    );
}

export default Username;