import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';

import prisma from 'lib/prisma';
import { getTweet } from 'lib/data';
import Tweet from 'components/Tweet';

export default function singleTweet({ tweet }) {
  return (
    <>
      {tweet ? (
        <div>
          <Tweet tweet={tweet} />
          <Button
            type="submit"
            variant="contained"
            className="text-[#991b1b] hover:bg-red-200"
          >
            <DeleteForeverIcon />
            Delete
          </Button>
        </div>
      ) : (
        <p>Tweet not exist</p>
      )}
    </>
  );
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
