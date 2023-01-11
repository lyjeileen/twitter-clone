import timeago from 'lib/timeago';
//next/image has better performance than html image
import Image from 'next/image';
export default function Tweet({ tweet }) {
  return (
    <>
      <div className="flex items-center">
        {tweet.author.image ? (
          <Image
            className="rounded-full mr-2"
            src={tweet.author.image}
            alt={'Author name'}
            width={30}
            height={30}
          />
        ) : (
          //show a placeholder icon for the user profile when there is no custom image available
          <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 mr-2">
            <svg
              className="absolute w-10 h-10 text-gray-400 -left-1"
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
        {tweet.author.name}
      </div>
      <div>{tweet.content}</div>
      <div>{timeago.format(new Date(tweet.createdAt))}</div>
    </>
  );
}
