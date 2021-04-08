import { FC } from 'react'
import LoginForm from '../components/LoginForm'

interface LoginProps {

}

const Login: FC<LoginProps> = ({}) => {
    return (
        <div className='pt-24'>
            <LoginForm />
        </div>
    );
}
export default Login;