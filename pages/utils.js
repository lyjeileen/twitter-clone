import Button from '@mui/material/Button';

export default function Utils() {
  return (
    <div className="m-8">
      <h2 className="text-xl mb-2">Utils</h2>
      <div>
        <Button
          type="submit"
          variant="contained"
          className="text-[#ec4899] my-2"
          onClick={async () => {
            await fetch('/api/utils', {
              body: JSON.stringify({
                task: 'clean_database',
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            });
          }}
        >
          Clean database
        </Button>
      </div>
      <div>
        <Button
          type="submit"
          variant="contained"
          className="text-[#ec4899] my-2"
          onClick={async () => {
            await fetch('/api/utils', {
              body: JSON.stringify({
                task: 'generate_users_and_tweets',
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            });
          }}
        >
          Generate user and tweets
        </Button>
      </div>
      <Button
        type="submit"
        variant="contained"
        className="text-[#ec4899] my-2"
        onClick={async () => {
          await fetch('/api/utils', {
            body: JSON.stringify({
              task: 'generate_one_tweet',
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });
        }}
      >
        Generate 1 new tweet
      </Button>
    </div>
  );
}
