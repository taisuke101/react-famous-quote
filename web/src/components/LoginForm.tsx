import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import Link from 'next/link';

import { GetMeDocument, useLoginMutation } from '../generated/graphql';
import SubmitButton from './SubmitButton';

interface LoginFormProps {
    usernameOrEmail: string;
    password: string;
}

const LoginForm: FC<{}> = ({}) => {
    const router = useRouter();

    const [error, setError] = useState<Record<string, string>>({});

    const { register, handleSubmit } = useForm<LoginFormProps>();

    const [ login, { loading } ] = useLoginMutation({
        // update: (cache, result) => {
        //     cache.writeQuery({
        //         query: GetMeDocument,
        //         data: {
        //             getMe: {
        //                 result
        //             }
        //         }
        //     })
        // },
        refetchQueries: [{ query: GetMeDocument }],
        onError: (err) => setError(err.graphQLErrors[0].extensions),
        onCompleted: () => router.push('/'),
    });

    const onSubmit = (value: LoginFormProps) => {
        login({ variables: value });
    };
    
    return (
        <div className='pt-24'>
            {
                loading 
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
                    <form 
                        onSubmit={handleSubmit(onSubmit)}
                        className='flex flex-col mx-40 text-center'
                    >
                        <p className='mt-2 text-xl'>ユーザー名</p>
                        { error.usernameOrEmail && <p className='text-red-600'>*{error.usernameOrEmail}</p>}
                        <input 
                            name='usernameOrEmail'
                            placeholder='ユーザー名またはメールアドレス'
                            className='p-2 mt-2 border-b-2 border-green-400'
                            {...register('usernameOrEmail')}
                        />
                        <p className='mt-2 text-xl'>パスワード</p>
                        { error.password && <p className='text-red-600'>*{error.password}</p>}
                        <input 
                            name='password'
                            type='password'
                            placeholder='パスワード'
                            className='p-2 mt-2 border-b-2 border-green-400'
                            {...register('password')}
                        />
                        <SubmitButton>
                            ログイン
                        </SubmitButton>
                        <Link href='/forgot-password'>
                            <a className='mt-4'>パスワードを忘れた場合</a>
                        </Link>
                    </form>
                )
            }
        </div>
    );
}
export default LoginForm;