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
		<>
			{loading ? (
				<div className='flex justify-center'>
					<h1>sending....</h1>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : complete ? (
				<>
					<div>メールを送信しました！</div>
					<span className='text-red-500'>
						*メールが届かない場合は誤ったアドレスを入力しているか、メールアドレスが登録されていない可能性があります。
					</span>
					<Link href='/'>
						<a>ホームに戻る</a>
					</Link>
				</>
			) : (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col mx-40 text-center'
				>
					<p className='mt-2 text-xl'>パスワードのリセット</p>
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
		</>
	);
};
export default ForgotPassword;
