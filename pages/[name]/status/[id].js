import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';

import prisma from 'lib/prisma';
import { getTweet } from 'lib/data';
import Tweet from 'components/Tweet';

export default function SingleTweet({ tweet }) {
  if (!tweet) return <p>Tweet not exist</p>;
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
