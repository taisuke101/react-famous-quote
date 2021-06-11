import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import Link from 'next/link';

import { CreateUserInput, useCreateUserMutation } from '../generated/graphql';
import SubmitButton from './parts/SubmitButton';

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

	const [createUser, { loading }] = useCreateUserMutation({
		onError: (err) =>
			setError(err.graphQLErrors[0].extensions?.formattedErrors),
		onCompleted: () => router.push('/login'),
	});

	const onSubmit = (value: CreateUserInput) => {
		createUser({ variables: { data: value } });
	};

	return (
		<div className='py-5 mx-4 bg-gray-200 rounded-md shadow-md md:mx-20 mt-14'>
			{loading ? (
				<div className='flex justify-center'>
					<h1>Loading....</h1>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<>
					<h1 className='mb-8 text-3xl text-center'>ユーザー新規登録</h1>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col mx-10 mt-10 space-y-5 text-center md:mx-20'
					>
						<p className='mt-2 text-xl text-gray-800 md:text-2xl'>ユーザー名</p>
						{error.username && (
							<p className='text-red-600'>*{error.username}</p>
						)}
						<input
							name='username'
							placeholder='ユーザー名'
							className='p-2 mt-2 border-b-2 border-green-400'
							{...register('username')}
						/>
						<p className='mt-2 text-xl text-gray-800 md:text-2xl'>
							Eメールアドレス
						</p>
						{error.email && <p className='text-red-600'>*{error.email}</p>}
						<input
							name='email'
							placeholder='Eメールアドレス'
							className='p-2 mt-2 border-b-2 border-green-400'
							{...register('email')}
						/>
						<p className='mt-2 text-xl text-gray-800 md:text-2xl'>パスワード</p>
						{error.password && (
							<p className='text-red-600'>*{error.password}</p>
						)}
						<input
							name='password'
							type='password'
							placeholder='パスワード'
							className='p-2 mt-2 border-b-2 border-green-400'
							{...register('password')}
						/>
						<p className='mt-2 text-xl text-gray-800 md:text-2xl'>
							確認用パスワード
						</p>
						{error.confirmPassword && (
							<p className='text-red-600'>*{error.confirmPassword}</p>
						)}
						<input
							name='confirmPassword'
							type='password'
							placeholder='確認用パスワード'
							className='p-2 mt-2 border-b-2 border-green-400'
							{...register('confirmPassword')}
						/>
						<SubmitButton>新規登録</SubmitButton>
						<Link href='/login'>
							<a className='mt-4 transition duration-500 hover:text-green-500'>
								すでにアカウントを作成している場合はこちら
							</a>
						</Link>
					</form>
				</>
			)}
		</div>
	);
};
export default RegisterForm;
