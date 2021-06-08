import { VFC } from 'react';
import QuoteCard from '../components/QuoteCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import Loader from 'react-loader-spinner';

import { useGetToptenQuotesQuery } from '../generated/graphql';

import 'swiper/swiper-bundle.css';
import Image from 'next/image';

SwiperCore.use([Navigation, Pagination]);

const Home: VFC = () => {
	const { data, loading } = useGetToptenQuotesQuery();

	return (
		<>
			{!data && loading ? (
				<div className='flex justify-center'>
					<h1>Loading....</h1>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<>
					<Image
						src='/tree.webp'
						alt='草原の画像'
						layout={'responsive'}
						width={500}
						height={300}
					/>
					<h1 className='py-4 mb-6 text-3xl tracking-widest text-center bg-green-400'>
						人気Top10の名言一覧
					</h1>
					<Swiper
						spaceBetween={50}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
					>
						{data?.getToptenQuotes.map((quote) => (
							<SwiperSlide key={quote.id}>
								<QuoteCard quote={quote} wiki={true} />
							</SwiperSlide>
						))}
					</Swiper>
				</>
			)}
		</>
	);
};

export default Home;
