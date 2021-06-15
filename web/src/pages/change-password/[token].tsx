import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import SubmitButton from '../../components/parts/SubmitButton';

import {
	ChangePasswordInput,
	useChangePasswordMutation,
} from '../../generated/graphql';

interface TokenProps {
	newPassword: string;
}

const Token: VFC<TokenProps> = ({}) => {
	const router = useRouter();

	const token = router.query.token;

	const [complete, setComplete] = useState(false);

	const [error, setError] = useState<Record<string, string>>({});

	const { register, handleSubmit } = useForm<TokenProps>();

	const [changePassword, { loading }] = useChangePasswordMutation({
		onError: (err) =>
			setError(err.graphQLErrors[0].extensions?.formattedErrors),
		onCompleted: () => setComplete(true),
	});

	const onSubmit = (value: ChangePasswordInput) => {
		changePassword({
			variables: {
				data: value,
				token: token as string,
			},
		});
	};

	return (
		<>
			<div className='py-5 mx-4 bg-gray-200 rounded-md shadow-md mb-96 md:mx-20 lg:mx-32 mt-14'>
				{loading ? (
					<div className='flex justify-center'>
						<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
					</div>
				) : complete ? (
					<div className='text-center'>
						<p className='mb-8 text-xl'>パスワードの再設定が完了しました！</p>
						<section className='space-x-3'>
							<Link href='/login'>
								<a className='transition duration-500 cursor-pointer hover:text-green-500'>
									ログインする
								</a>
							</Link>
							<Link href='/'>
								<a className='transition duration-500 cursor-pointer hover:text-green-500'>
									ホームに戻る
								</a>
							</Link>
						</section>
					</div>
				) : (
					<form
						onSubmit={handleSubmit(onSubmit)}
						className='flex flex-col mx-5 space-y-5 text-center'
					>
						<p style={{ fontFamily: 'Kiwi Maru' }} className='mt-2 text-xl'>
							新しいパスワードに変更
						</p>
						{error.newPassword && (
							<p className='text-red-600'>{error.newPassword}</p>
						)}
						{error.token && <p className='text-red-600'>{error.token}</p>}
						{error.userId && <p className='text-red-600'>{error.userId}</p>}
						<input
							name='newPassword'
							placeholder='新しいパスワード'
							className='p-2 mt-2 border-b-2 border-green-400'
							{...register('newPassword')}
						/>
						<SubmitButton>変更</SubmitButton>
					</form>
				)}
			</div>
		</>
	);
};
export default Token;
