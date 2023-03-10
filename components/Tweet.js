import timeago from 'lib/timeago';
//next/image has better performance than html image
import { useState } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import NewComment from 'components/NewComment';
import Avatar from 'components/Avatar';
import Tweets from 'components/Tweets';

export default function Tweet({ tweet }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [newComment, setNewComment] = useState(false);
  const comments = tweet.comments;

  return (
    <div
      className={`flex p-4 my-8 border-solid border-red-400 hover:shadow-md ${
        tweet.parent ? 'border-b-2' : 'border-2 rounded-lg'
      } `}
    >
      {/* use flex-shrink-0 to avoid the change of avatar size in small screen. flex in the outer box could shrink avatar */}
      <div className="mr-2 flex-shrink-0">
        <Avatar image={tweet.author.image} />
      </div>

      <div className="flex-auto">
        <div className="mb-1 font-bold text-red-900 flex justify-between">
          <Link href={`/${tweet.author.name}`}>
            <p className="hover:underline">{tweet.author.name}</p>
          </Link>
          {/* only display delete button if user is the author of this tweet */}
          {session && session.user.email === tweet.author.email && (
            <DeleteForeverIcon
              className="text-[18px] text-red-400 hover:text-red-800"
              onClick={async () => {
                const res = await fetch('/api/tweet', {
                  body: JSON.stringify({
                    id: tweet.id,
                  }),
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  method: 'DELETE',
                });

                if (res.status === 401) {
                  alert('Unauthorized');
                }
                if (res.status === 200) {
                  router.push('/home');
                }
              }}
            />
          )}
        </div>
        {/* no link for comments */}
        {tweet.parent ? (
          <div className="mb-1">{tweet.content}</div>
        ) : (
          <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
            <div className="mb-1">{tweet.content}</div>
          </Link>
        )}

        <div className="text-gray-800 text-xs flex justify-between">
          {timeago.format(new Date(tweet.createdAt))}

          {/* only show icons if logged in */}
          {session && session.user.email && (
            <div className="flex justify-evenly min-w-[88px] text-red-400">
              <FavoriteBorderIcon className="text-[16px] hover:text-red-800" />
              <ChatBubbleOutlineIcon
                onClick={() => setNewComment(!newComment)}
                className="text-[16px] hover:text-red-800"
              />
              {!tweet.parent && (
                <ShareIcon className="text-[16px] hover:text-red-800" />
              )}
            </div>
          )}
        </div>
        {/* only show comment section after clicking the comment button */}
        {newComment && <NewComment tweet={tweet} />}
        {comments && newComment && <Tweets tweets={comments} />}
      </div>
    </div>
  );
}
