import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';

const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#F87171',
    },
    '&:hover fieldset': {
      borderColor: '#EF4444',
    },
  },
});

export default function NewTweet() {
  const { data: session } = useSession();
  const [content, setContent] = useState();
  const router = useRouter();
  const [error, setError] = useState();

  //don't display if we're not logged in
  if (!session || !session.user) return null;
  return (
    <>
      {error && <Alert severity="warning">{error}</Alert>}
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();

          if (!content) {
            setError('Type something before you tweet');
          } else {
            await fetch('api/tweet', {
              body: JSON.stringify({
                content,
              }),
              headers: {
                'Content-Type': 'application/json',
              },
              method: 'POST',
            });

            //remove content and error if post successfully
            setContent('');
            setError('');
            router.replace(router.asPath);
          }
        }}
      >
        <CssTextField
          fullWidth
          label="What are you humming about?"
          id="outlined-multiline-flexible"
          margin="normal"
          multiline
          maxRows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            variant="contained"
            className="text-[#991b1b] font-bold hover:bg-red-200"
          >
            Tweet
          </Button>
        </div>
      </Box>
    </>
  );
}
