import { useRouter } from 'next/router';
import { VFC } from 'react';
import { useForm } from 'react-hook-form';

import { FaSearch } from 'react-icons/fa';

interface SearchBoxProps {
	searchArgs: string;
}

const SearchBox: VFC<{}> = ({}) => {
	const router = useRouter();

	const { register, handleSubmit } = useForm<SearchBoxProps>();

	const onSubmit = (value: string[]) => {
		const objectValue: string[] = Object.values(value);
		router.push({
			pathname: '/search',
			query: {
				searchArgs: objectValue,
			},
		});
	};

	return (
		<section className='flex items-center px-2 mx-2 bg-white rounded-lg'>
			<form className='flex' onSubmit={handleSubmit(onSubmit)}>
				<input
					className='w-full bg-transparent h-9 focus:outline-none'
					name='searchArgs'
					placeholder='ワード検索'
					{...register('searchArgs')}
				/>
				<button type='submit' className='focus:outline-none'>
					<FaSearch className='text-gray-600' />
				</button>
			</form>
		</section>
	);
};
export default SearchBox;
