import prisma from 'lib/prisma';
import { getUserTweets } from 'lib/data';

import Tweets from 'components/Tweets';

export default function UserProfile({ name, tweets }) {
  return (
    <>
      <h2>User profile of {name}</h2>
      <Tweets tweets={tweets} />
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  let userTweets = await getUserTweets(prisma, params.name);
  userTweets = JSON.parse(JSON.stringify(userTweets));
  return {
    props: {
      name: params.name,
      tweets: userTweets,
    },
  };
};
