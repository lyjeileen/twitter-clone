import prisma from 'lib/prisma';
import { getTweet } from 'lib/data';
import Tweet from 'components/Tweet';

export default function singleTweet({ tweet }) {
  return <>{tweet ? <Tweet tweet={tweet} /> : <p>Tweet not exist</p>}</>;
}

export const getServerSideProps = async ({ params }) => {
  let tweet = await getTweet(prisma, params.id);
  tweet = JSON.parse(JSON.stringify(tweet));

  return {
    props: {
      tweet: tweet,
    },
  };
};
