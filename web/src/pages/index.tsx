import { VFC } from 'react';
import QuoteCard from '../components/QuoteCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination } from 'swiper';
import Loader from 'react-loader-spinner';

import { useGetToptenQuotesQuery } from '../generated/graphql';

import 'swiper/swiper-bundle.css';

SwiperCore.use([Navigation, Pagination]);

const Home: VFC = () => {
	const { data, loading } = useGetToptenQuotesQuery();

	return (
		<>
			<h1 className='mb-4 text-2xl text-center'>人気Top10の名言一覧</h1>
			{!data && loading ? (
				<div className='flex justify-center'>
					<h1>Loading....</h1>
					<Loader type='TailSpin' color='#00fa9a' height={200} width={200} />
				</div>
			) : (
				<>
					<Swiper
						spaceBetween={50}
						slidesPerView={1}
						navigation
						pagination={{ clickable: true }}
					>
						{data.getToptenQuotes.map((quote) => (
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
