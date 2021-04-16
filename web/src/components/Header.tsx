import { FC, useEffect, useRef, useState } from 'react';
import { useApolloClient } from '@apollo/client';
import { useRouter } from 'next/router'
import Link from 'next/link';

import PageLink from './PageLink';
import { useGetMeQuery, useLogoutMutation } from '../generated/graphql';

import { FaChevronCircleDown, FaChevronCircleRight } from 'react-icons/fa';

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({}) => {
    const router = useRouter();
    const apolloClient = useApolloClient();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        open && menuRef.current.focus();
    }, [open])

    const { data } = useGetMeQuery();

    const [ logout ] = useLogoutMutation({
        onCompleted: () => apolloClient.resetStore(),
    });

    let body = null;

    if (!data?.getMe) {
        body = (
            <>
                <PageLink 
                    href='/about'
                    text='このサイトについて'
                />
                <PageLink
                    href='/quotes'
                    text='名言一覧'
                />
                <PageLink
                    href='/login'
                    text='ログイン'
                />
                <PageLink
                    href='/register'
                    text='新規登録'
                />
            </>
        )
    } else {
        body = (
            <div className='flex space-x-4'>
                <PageLink 
                    href='/about'
                    text='このサイトについて'
                />
                <PageLink
                    href='/quotes'
                    text='名言一覧'
                />
                <div
                    onClick={() => setOpen(!open)}
                    ref={menuRef}
                    onBlur={() => setOpen(false)}
                    tabIndex={0}
                >
                    <section className='flex items-center space-x-1'>
                        {open ? (
                            <FaChevronCircleDown />
                        ) : (
                            <FaChevronCircleRight />
                        )
                        }
                        <div>ユーザー名：{data.getMe.username}</div>
                    </section>
                    {open ? (
                        <section 
                            className='absolute flex flex-col p-3 space-y-3 text-center bg-gray-400 w-52 right-5'
                        >
                            <Link href={`/user/${data.getMe.username}`}>
                                <div className='cursor-pointer'>
                                    ストック一覧
                                </div>
                            </Link>
                            <div
                                className='cursor-pointer'
                                onClick={async () =>{
                                    await router.push('/');
                                    await logout();
                            }}
                            >ログアウト</div>
                        </section>
                    ) : ''
                    }
                </div>
            </div>
        )
    }

    return (
        <div className='fixed z-10 w-full px-6 py-6 bg-green-200'>
            <section className='flex justify-between'>
                <PageLink 
                    href='/'
                    text='名言ポータル'
                    textClass='text-2xl tracking-widest'
                />
                <section className='space-x-4 text-lg'>
                    {body}
                </section>
            </section>
        </div>
    );
}

export default Header;