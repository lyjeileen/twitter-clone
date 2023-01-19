import { useSession } from 'next-auth/react';
import Link from 'next/link';
//useRouter can access router
import { useRouter } from 'next/router';
import Button from '@mui/material/Button';
import { getSomeTweets } from 'lib/data';
import prisma from 'lib/prisma';
import Tweets from 'components/Tweets';

export default function Index({ tweets }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return null;
  }

  //session is null if user is not logged in
  if (session) {
    //navigate to home
    router.push('/home');
  }

  return (
    <>
      <div className="border-solid border-2 border-red-100 rounded-xl p-4 text-center bg-red-200 max-w-md m-auto">
        <div className="text-xl my-6">Join the conversation!</div>
        <div>
          <Button
            variant="contained"
            className="text-[#991b1b] font-bold hover:bg-red-200"
          >
            <Link href="/api/auth/signin">login</Link>
          </Button>
        </div>
      </div>
      <Tweets tweets={tweets} />
    </>
  );
}

export const getServerSideProps = async () => {
  const take = 4;
  let tweets = await getSomeTweets(prisma, take);
  tweets = JSON.parse(JSON.stringify(tweets));

  return {
    props: {
      tweets,
    },
  };
};
