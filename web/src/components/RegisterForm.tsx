import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';

import { CreateUserInput, useCreateUserMutation } from '../generated/graphql';
import SubmitButton from './SubmitButton';

interface RegisterFormProps {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterForm: FC<{}> = ({}) => {
    const router = useRouter();

    const [error, setError] = useState<Record<string, string>>({});

    const { register, handleSubmit } = useForm<RegisterFormProps>();

    const [ createUser, { loading } ] = useCreateUserMutation({
        onError: (err) => setError(err.graphQLErrors[0].extensions?.formattedErrors),
        onCompleted: () => router.push('/login'),
    });

    const onSubmit = (value: CreateUserInput) => {
        createUser({ variables: {data: value} });
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
                        { error.username && <p className='text-red-600'>*{error.username}</p>}
                        <input 
                            name='username'
                            placeholder='ユーザー名'
                            className='p-2 mt-2 border-b-2 border-green-400'
                            {...register('username')}
                        />
                        <p className='mt-2 text-xl'>Eメールアドレス</p>
                        { error.email && <p className='text-red-600'>*{error.email}</p>}
                        <input 
                            name='email'
                            placeholder='Eメールアドレス'
                            className='p-2 mt-2 border-b-2 border-green-400'
                            {...register('email')}
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
                        <p className='mt-2 text-xl'>確認用パスワード</p>
                        { error.confirmPassword && <p className='text-red-600'>*{error.confirmPassword}</p>}
                        <input 
                            name='confirmPassword'
                            type='password'
                            placeholder='確認用パスワード'
                            className='p-2 mt-2 border-b-2 border-green-400'
                            {...register('confirmPassword')}
                        />
                        <SubmitButton>
                            新規登録
                        </SubmitButton>
                    </form>
                )
            }
        </div>
    );
}
export default RegisterForm;