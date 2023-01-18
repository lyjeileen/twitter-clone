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

export default function NewComment({ tweet }) {
  const { data: session } = useSession();
  const [content, setContent] = useState();
  const router = useRouter();

  if (!session || !session.user) return null;
  return (
    <>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={async (e) => {
          e.preventDefault();

          await fetch('api/tweet', {
            body: JSON.stringify({
              content,
              parent: tweet.id,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });

          //remove content if post successfully
          setContent('');

          router.replace(router.asPath);
        }}
      >
        <CssTextField
          fullWidth
          label="Add a comment"
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
            disabled={!content}
          >
            Post
          </Button>
        </div>
      </Box>
    </>
  );
}
