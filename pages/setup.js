import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

export default function Setup() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState('');
  const [error, setError] = useState();
  const router = useRouter();

  if (!session || !session.user) return null;
  if (status === 'loading') return null;

  if (status !== 'loading' && session.user.name) {
    router.push('/home');
  }

  return (
    <Box
      sx={{ '& > :not(style)': { m: 1 } }}
      component="form"
      className="m-auto flex flex-col w-fit"
      onSubmit={async (e) => {
        e.preventDefault();

        if (!username) {
          setError('Username cannot be empty');
        } else {
          let response = await fetch('/api/setup', {
            body: JSON.stringify({
              username,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          });

          if (response.status === 200) {
            session.user.name = username;
            router.push('/home');
          } else {
            const error = await response.json();
            console.log(error);
            if (error) {
              setError(error.message);
            }
          }
        }
      }}
    >
      {error && <Alert severity="warning">{error}</Alert>}
      <p className="pt-3">Enter a username</p>
      <TextField
        id="input-with-icon-textfield"
        label="Username"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        variant="standard"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" className="text-[#ec4899]">
          Confirm
        </Button>
      </div>
    </Box>
  );
}
