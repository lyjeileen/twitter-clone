import timeago from 'lib/timeago';

export default function Tweet({ tweet }) {
  console.log(tweet);
  return (
    <>
      <div>{tweet.author.username}</div>
      <div>{tweet.content}</div>
      <div>{timeago.format(new Date(tweet.createdAt))}</div>
    </>
  );
}
