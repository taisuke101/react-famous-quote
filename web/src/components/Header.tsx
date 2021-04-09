import { FC } from 'react';

import PageLink from './PageLink';
import { useGetMeQuery, useLogoutMutation } from '../generated/graphql';
import { useApolloClient } from '@apollo/client';

interface HeaderProps {

}

const Header: FC<HeaderProps> = ({}) => {
    const apolloClient = useApolloClient();
    const { data } = useGetMeQuery();
    const [ logout ] = useLogoutMutation();

    let body = null;

    if (!data?.getMe) {
        body = (
            <>
                <PageLink
                    href='/quote'
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
            <>
                <span>ユーザー名：{data.getMe.username}</span>
                <PageLink
                    href='/quote'
                    text='名言一覧'
                />
                <button
                　onClick={async () => {
                    await logout();
                    await apolloClient.resetStore();
                }}
                >ログアウト</button>
            </>
        )
    }

    return (
        <div className='fixed w-full px-4 py-6 bg-green-200'>
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