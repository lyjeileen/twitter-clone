import prisma from 'lib/prisma';
import { getUserTweets } from 'lib/data';

import Tweets from 'components/Tweets';

export default function UserProfile({ name, tweets }) {
  return (
    <>
      {tweets.length !== 0 ? (
        <div>
          <h2>User profile of {name}</h2>
          <Tweets tweets={tweets} />
        </div>
      ) : (
        <p>ERROR: Page not found</p>
      )}
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  let userTweets = await getUserTweets(prisma, params.name);
  if (userTweets.length !== 0) {
    userTweets = JSON.parse(JSON.stringify(userTweets));
  }
  return {
    props: {
      name: params.name,
      tweets: userTweets,
    },
  };
};
