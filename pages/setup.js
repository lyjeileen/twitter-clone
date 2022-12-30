import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import Button from '@mui/material/Button';

export default function Setup() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  if (!session || !session.user) return null;

  return (
    <Box
      sx={{ '& > :not(style)': { m: 1 } }}
      className="m-auto flex flex-col w-fit"
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
