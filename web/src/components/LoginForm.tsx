import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import Link from 'next/link';

import {
	GetMeDocument,
	GetToptenQuotesDocument,
	useLoginMutation,
} from '../generated/graphql';
import SubmitButton from './parts/SubmitButton';

interface LoginFormProps {
	usernameOrEmail: string;
	password: string;
}

const LoginForm: FC<{}> = ({}) => {
	const router = useRouter();

	const [error, setError] = useState<Record<string, string>>({});

	const { register, handleSubmit } = useForm<LoginFormProps>();

	const [login, { loading }] = useLoginMutation({
		update: (cache, result) => {
			cache.writeQuery({
				query: GetMeDocument,
				data: {
					getMe: {
						result,
					},
				},
			});
		},
		refetchQueries: [{ query: GetToptenQuotesDocument }],
		onError: (err) =>
			setError(err.graphQLErrors[0].extensions?.formattedErrors),
		onCompleted: () => router.push('/'),
	});

	const onSubmit = (value: LoginFormProps) => {
		login({ variables: value });
	};

	return (
		<>
			{loading ? (
				<div className='flex justify-center'>
					<h1>Loading....</h1>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col mx-40 text-center'
					>
						{router.query.errorMessage && (
							<h1 className='mb-5 text-lg text-red-500'>
								{router.query.errorMessage}
							</h1>
						)}
						<p className='mt-2 text-xl'>ユーザー名</p>
						{error.usernameOrEmail && (
							<p className='text-red-600'>*{error.usernameOrEmail}</p>
						)}
						<input
							name='usernameOrEmail'
							placeholder='ユーザー名またはメールアドレス'
							className='p-2 mt-2 border-b-2 border-green-400'
							{...register('usernameOrEmail')}
						/>
						<p className='mt-2 text-xl'>パスワード</p>
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
						<SubmitButton>ログイン</SubmitButton>
						<Link href='/register'>
							<a className='mt-4 transition duration-500 hover:text-green-500'>
								アカウントを持っていない場合はこちら
							</a>
						</Link>
						<Link href='/forgot-password'>
							<a className='mt-4 transition duration-500 hover:text-green-500'>
								パスワードを忘れた場合
							</a>
						</Link>
					</form>
				</>
			)}
		</>
	);
};
export default LoginForm;
