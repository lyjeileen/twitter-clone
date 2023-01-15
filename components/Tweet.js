import timeago from 'lib/timeago';
//next/image has better performance than html image
import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

export default function Tweet({ tweet }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  return (
    <div className="flex border-solid p-2 my-8 border-2 border-red-400 rounded-lg hover:shadow-md">
      {/* use flex-shrink-0 to avoid the change of avatar size in small screen. flex in the outer box could shrink avatar */}
      <div className="mr-2 flex-shrink-0">
        {tweet.author.image ? (
          <Image
            className="rounded-full ring-2 ring-red-400"
            src={tweet.author.image}
            alt="Author name"
            width={40}
            height={40}
          />
        ) : (
          //show a placeholder icon for the user profile when there is no custom image available
          <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full ring-2 ring-red-400 dark:bg-gray-600 ">
            <svg
              className="absolute w-12 h-12 text-gray-400 -left-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </div>
        )}
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
        <Link href={`/${tweet.author.name}/status/${tweet.id}`}>
          <div className="mb-1">{tweet.content}</div>
        </Link>
        <div className="text-gray-800 text-xs flex justify-between">
          {timeago.format(new Date(tweet.createdAt))}
          <div className="flex justify-evenly min-w-[88px] text-red-400">
            <FavoriteBorderIcon className="text-[16px] hover:text-red-800" />
            <ChatBubbleOutlineIcon className="text-[16px] hover:text-red-800" />
            <ShareIcon className="text-[16px] hover:text-red-800" />
          </div>
        </div>
      </div>
    </div>
  );
}
