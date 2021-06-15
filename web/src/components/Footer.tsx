import { VFC } from 'react';

import PageLink from '../components/parts/PageLink';

interface FooterProps {}

const Footer: VFC<FooterProps> = ({}) => {
	return (
		<div className='h-auto pb-10 bg-green-800'>
			<section className='pt-10 pb-3 text-center border-b-2'>
				<div
					style={{ fontFamily: 'Kiwi Maru' }}
					className='text-2xl text-white'
				>
					名言ポータル
				</div>
			</section>
			<section className='flex justify-center pt-5 space-x-52'>
				<PageLink
					href='/'
					text='Home'
					textClass='text-2xl text-white hover:text-black transition duration-500'
				/>
				<PageLink
					href='/quotes'
					text='名言一覧'
					textClass='text-2xl text-white hover:text-black transition duration-500'
				/>
			</section>
			<section
				style={{ fontFamily: 'Kiwi Maru' }}
				className='text-xl text-center text-white mt-14'
			>
				Created By Taisuke Yamamoto
			</section>
		</div>
	);
};
export default Footer;
