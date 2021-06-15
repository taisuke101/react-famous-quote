import { FC } from 'react';
import RegisterForm from '../components/RegisterForm';
import SEO from '../components/SEO';

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
	return (
		<>
			<SEO
				siteTitle='新規登録'
				title='新規登録'
				description='ユーザー新規登録ページです'
			/>
			<RegisterForm />
		</>
	);
};
export default Register;
