import prisma from 'lib/prisma';
import { getTweet } from 'lib/data';
import Tweet from 'components/Tweet';
import { router } from 'next/router';

export default function SingleTweet({ tweet }) {
  if (!tweet) return <p>Tweet not exist</p>;
  if (typeof window !== 'undefined' && tweet.parent) {
    router.push(`/${tweet.parentData.author.name}/status/${tweet.parent}`);
  }
  return <Tweet tweet={tweet} />;
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
