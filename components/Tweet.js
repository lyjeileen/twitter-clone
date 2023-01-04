import timeago from 'lib/timeago';

export default function Tweet({ tweet }) {
  return (
    <>
      <div>{tweet.author.name}</div>
      <div>{tweet.content}</div>
      <div>{timeago.format(new Date(tweet.createdAt))}</div>
    </>
  );
}
