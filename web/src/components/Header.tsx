import { FC, useEffect, useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router';
import Link from 'next/link';

import PageLink from './parts/PageLink';
import { useGetMeQuery, useLogoutMutation } from '../generated/graphql';

import {
	FaChevronCircleDown,
	FaChevronCircleRight,
	FaTimes,
} from 'react-icons/fa';
import { GiHamburgerMenu } from 'react-icons/gi';
import Collapsible from 'react-collapsible';

interface HeaderProps {}

const Header: FC<HeaderProps> = ({}) => {
	const router = useRouter();
	const apolloClient = useApolloClient();
	const [open, setOpen] = useState(false);
	const [ref, setRef] = useState(false);
	const menuRef = useRef(null);

	useEffect(() => {
		ref && menuRef.current.focus();
	}, [ref]);

	const { data } = useGetMeQuery();

	const [logout] = useLogoutMutation({
		onCompleted: () => apolloClient.resetStore(),
	});

	let body = null;

	if (!data?.getMe) {
		body = (
			<>
				<PageLink href='/quotes' text='名言一覧' textClass='md:text-2xl' />
				<PageLink href='/login' text='ログイン' textClass='md:text-2xl' />
				<PageLink href='/register' text='新規登録' textClass='md:text-2xl' />
			</>
		);
	} else {
		body = (
			<div className='flex space-x-4'>
				<PageLink href='/quotes' text='名言一覧' textClass='md:text-2xl' />
				<div
					onClick={() => {
						setOpen(!open);
						setRef(true);
					}}
					ref={menuRef}
					onBlur={() => setOpen(false)}
					tabIndex={0}
					className='focus:outline-none'
				>
					<section
						style={{ fontFamily: 'Kiwi Maru' }}
						className='flex items-center space-x-1 md:text-xl'
					>
						{open ? <FaChevronCircleDown /> : <FaChevronCircleRight />}
						<div className='cursor-pointer' data-testid='header-open'>
							ユーザー名：{data.getMe.username}
						</div>
					</section>
					{open ? (
						<section className='absolute flex flex-col px-3 py-5 space-y-4 text-center bg-gray-200 w-52 right-5'>
							<Link href={`/user/${data.getMe.username}`}>
								<div
									style={{ fontFamily: 'Kiwi Maru' }}
									className='transition duration-500 cursor-pointer hover:text-green-500'
									data-testid='stock-button'
								>
									ストック一覧
								</div>
							</Link>
							<div
								style={{ fontFamily: 'Kiwi Maru' }}
								className='transition duration-500 cursor-pointer hover:text-green-500'
								data-testid='logout-button'
								onClick={async () => {
									await router.push('/');
									await logout();
								}}
							>
								ログアウト
							</div>
						</section>
					) : (
						''
					)}
				</div>
			</div>
		);
	}

	return (
		<div className='fixed z-10 w-full px-6 py-6 bg-green-200'>
			<section className='flex justify-between'>
				<section className='flex'>
					<PageLink
						href='/'
						text='名言ポータル'
						textClass='font-medium text-3xl tracking-wider lg:tracking-widest'
					/>
				</section>
				<section className='hidden space-x-4 text-lg md:flex'>{body}</section>
				{!open ? (
					<GiHamburgerMenu
						onClick={() => setOpen(true)}
						className='text-4xl md:hidden'
					/>
				) : (
					<section className='fixed top-0 left-0 z-40 w-full h-full bg-gray-100 backdrop-blur-10 bg-opacity-10 bg-clip-padding md:hidden'>
						<button
							type='button'
							className='absolute text-5xl text-red-700 top-4 right-6'
							onClick={() => setOpen(false)}
						>
							<FaTimes />
						</button>
						<section>
							{data.getMe ? (
								<div className='flex flex-col items-center text-2xl pt-60 space-y-9'>
									<PageLink
										href='/quotes'
										text='名言一覧'
										textClass='transition duration-500 cursor-pointer hover:text-green-600'
										onClick={() => setOpen(false)}
									/>
									<div style={{ fontFamily: 'Kiwi Maru' }}>
										<Collapsible
											className='transition duration-500 cursor-pointer hover:text-green-600'
											trigger={`ユーザー名：${data.getMe.username}`}
										>
											<div className='flex flex-col text-center text-blue-800'>
												<Link href={`/user/${data.getMe.username}`}>
													<div
														style={{ fontFamily: 'Kiwi Maru' }}
														className='transition duration-500 cursor-pointer hover:text-green-600'
														data-testid='stock-button'
														onClick={() => setOpen(false)}
													>
														・ストック一覧
													</div>
												</Link>
												<div
													style={{ fontFamily: 'Kiwi Maru' }}
													className='transition duration-500 cursor-pointer hover:text-green-600'
													data-testid='logout-button'
													onClick={async () => {
														await router.push('/');
														await logout();
														setOpen(false);
													}}
												>
													・ログアウト
												</div>
											</div>
										</Collapsible>
									</div>
								</div>
							) : (
								<div
									className='flex flex-col items-center text-xl pt-60 space-y-9'
									onClick={() => setOpen(false)}
								>
									<PageLink
										href='/quotes'
										text='名言一覧'
										textClass='text-3xl transition duration-500 cursor-pointer hover:text-green-600'
									/>
									<PageLink
										href='/login'
										text='ログイン'
										textClass='text-3xl transition duration-500 cursor-pointer hover:text-green-600'
									/>
									<PageLink
										href='/register'
										text='新規登録'
										textClass='text-3xl transition duration-500 cursor-pointer hover:text-green-600'
									/>
								</div>
							)}
						</section>
					</section>
				)}
			</section>
		</div>
	);
};

export default Header;
