import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function NewTweet() {
  const { data: session } = useSession();

  //don't display if we're not logged in
  if (!session) return null;

  return (
    <>
      <Box
        component="form"
        //add padding
        sx={{
          '& .MuiTextField-root': { p: 3 },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="What are you humming about?"
          multiline
          maxRows={4}
          //add margin becuase of padding on Box
          sx={{
            '& label': {
              marginLeft: 3,
              marginTop: 3,
              '&.Mui-focused': {
                marginLeft: 3,
              },
            },
          }}
        />
      </Box>
    </>
  );
}
