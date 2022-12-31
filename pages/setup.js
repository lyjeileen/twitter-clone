import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

export default function Setup() {
  const { data: session, status } = useSession();
  const [name, setName] = useState('');
  const router = useRouter();

  if (!session || !session.user) return null;
  if (status === 'loading') return null;

  if (status !== 'loading' && session.user.name) {
    router.push('/home');
  }

  return (
    <Box
      sx={{ '& > :not(style)': { m: 1 } }}
      className="m-auto flex flex-col w-fit"
      onSubmit={async (e) => {
        e.preventDefault();

        if (!session.user.name) {
          setError('Type something before you tweet');
        }

        await fetch('api/user', {
          body: JSON.stringify({
            name,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
        });
        session.user.name = name;
        router.push('/home');
      }}
    >
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
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div>
        <Button type="submit" variant="contained" className="text-[#ec4899]">
          Confirm
        </Button>
      </div>
    </Box>
  );
}
