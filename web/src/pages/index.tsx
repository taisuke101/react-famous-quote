import Head from 'next/head';

import { useGetQuotesQuery } from '../generated/graphql';

export default function Home() {
  // const { data } = useGetQuotesQuery();

  return (
    <div className='pt-24'>
      <div>hello</div>
    </div>
  )
}
