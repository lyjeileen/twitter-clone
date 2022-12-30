import timeago from 'lib/timeago';

export default function Tweet({ tweet }) {
  return (
    <>
      <p>{tweet.content}</p>
      <p>{timeago.format(new Date(tweet.createdAt))}</p>
    </>
  );
}
