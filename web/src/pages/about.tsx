import { VFC } from 'react';
import Image from 'next/image';

import { FaSearch } from 'react-icons/fa';
import { BsFillBookmarksFill, BsFillHeartFill } from 'react-icons/bs';

interface AboutProps {}

const About: VFC<AboutProps> = ({}) => {
	return (
		<div className='px-5 mb-10'>
			<article className='w-full space-y-5'>
				<Image
					src='/tree.webp'
					alt='草原の画像'
					layout={'responsive'}
					width={500}
					height={300}
					className='rounded-lg'
				/>
				<section>
					<h1 className='text-4xl text-center'>このサイトについて</h1>
					<div className='mt-5 text-xl text-center'>
						このサイトは世界の偉人、有名人の名言を集めたサイトです。
						<p>
							偉人、有名人の言葉に元気をもらったり、参考にしていただければ嬉しいです。
						</p>
					</div>
				</section>
			</article>
			<article>
				<h1 className='mt-5 text-4xl text-center'>サイトの使い方</h1>
				<section className='py-10 mt-4 bg-gray-100 rounded-lg shadow-lg'>
					<h1 className='text-3xl font-semibold text-center'>探す</h1>
					<div className='grid grid-cols-2 mt-10'>
						<div className='flex justify-center'>
							<FaSearch className='text-green-500 text-8xl' />
						</div>
						<div>
							名言一覧や、サイドバーの検索機能を使用して名言を探すことができます。
							<p>自分に合った名言、心に響く名言を探してください。</p>
						</div>
					</div>
				</section>
				<section className='py-10 mt-10 bg-gray-100 rounded-lg shadow-lg'>
					<h1 className='text-3xl font-semibold text-center'>
						お気に入りを見つける
					</h1>
					<div className='grid grid-cols-2 mt-10'>
						<div className='flex justify-center space-x-3'>
							<BsFillHeartFill className='text-red-500 text-8xl' />
							<BsFillBookmarksFill className='text-blue-500 text-8xl' />
						</div>
						<div>
							名言をいいね！したり、ストックすることができます。
							<p>気に入った名言を後でいつでも確認することができます。</p>
							<p className='mt-3 text-red-500 break-words'>
								＊いいね機能、ストック機能を使用するにはアカウントを作成する必要が有ります。
							</p>
						</div>
					</div>
				</section>
			</article>
		</div>
	);
};
export default About;
