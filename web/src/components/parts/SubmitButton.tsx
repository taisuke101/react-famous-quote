import { FC } from 'react';

interface SubmitButtonProps {}

const SubmitButton: FC<SubmitButtonProps> = ({ children }) => {
	return (
		<button
			type='submit'
			className='px-6 py-2 mx-auto mt-2 text-lg font-medium tracking-widest text-white transition duration-500 transform bg-green-400 rounded-lg font-kiwi hover:text-black hover:bg-green-600'
		>
			{children}
		</button>
	);
};
export default SubmitButton;
