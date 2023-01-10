import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import prisma from 'lib/prisma';
import { getTweets } from 'lib/data';

import NewTweet from 'components/NewTweet';
import Tweets from 'components/Tweets';

export default function Home({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  //go to login if no session
  if (!session) {
    router.push('/');
  }

  //if no username, redirect to setup
  if (session && !session.user.name) {
    router.push('/setup');
    return null;
  }

  return (
    <div className="p-5">
      <NewTweet />
      <Tweets tweets={tweets} />
    </div>
  );
}

export const getServerSideProps = async () => {
  let tweets = await getTweets(prisma);
  //convert createdAt timestamp to string format(getServerSideProps returns data as JSON-encoded, JSON doesn't support Date objects)
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    //pass tweets to Home as props
    props: {
      tweets,
    },
  };
};
