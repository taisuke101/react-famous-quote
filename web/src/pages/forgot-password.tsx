import Link from 'next/link';
import { useState, VFC } from 'react';
import { useForm } from 'react-hook-form';
import Loader from 'react-loader-spinner';
import SubmitButton from '../components/parts/SubmitButton';
import { useForgotPasswordMutation } from '../generated/graphql';

interface ForgotPasswordProps {
	email: string;
}

const ForgotPassword: VFC<ForgotPasswordProps> = ({}) => {
	const [complete, setComplete] = useState(false);

	const [forgotPassword, { loading }] = useForgotPasswordMutation({
		onCompleted: () => setComplete(true),
	});

	const { register, handleSubmit } = useForm<ForgotPasswordProps>();

	const onSubmit = (value: ForgotPasswordProps) => {
		forgotPassword({
			variables: value,
		});
	};

	return (
		<div className='py-5 mx-4 bg-gray-200 rounded-md shadow-md mt-14'>
			{loading ? (
				<div className='flex justify-center'>
					<h1>sending....</h1>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : complete ? (
				<div className='flex flex-col space-y-5 text-center'>
					<span>メールを送信しました！</span>
					<span className='text-red-500'>
						*メールが届かない場合は誤ったアドレスを入力しているか、メールアドレスが登録されていない可能性があります。
					</span>
					<Link href='/'>
						<a className='transition duration-500 hover:text-green-500'>
							ホームに戻る
						</a>
					</Link>
				</div>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col mx-10 space-y-5 text-center md:mx-40'
				>
					<p className='mt-2 text-xl text-gray-800'>パスワードのリセット</p>
					<span>
						パスワードリセットのメールを送るため、以下の欄に登録したメールアドレスを入力して下さい。
					</span>
					<input
						name='email'
						placeholder='パスワードリセットメール送信先'
						className='p-2 mt-2 border-b-2 border-green-400'
						{...register('email')}
					/>
					<SubmitButton>登録</SubmitButton>
				</form>
			)}
		</div>
	);
};
export default ForgotPassword;
