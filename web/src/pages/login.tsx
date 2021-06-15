import { FC } from 'react';

import LoginForm from '../components/LoginForm';
import SEO from '../components/SEO';

interface LoginProps {}

const Login: FC<LoginProps> = ({}) => {
	return (
		<>
			<SEO
				siteTitle='ログイン'
				title='ログイン'
				description='ログインページです'
			/>
			<LoginForm />
		</>
	);
};
export default Login;
