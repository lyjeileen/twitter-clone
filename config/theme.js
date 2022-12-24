import { Roboto } from '@next/font/google';

import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
});

export const theme = createTheme({
  palette: {
    primary: {
      main: '#ec4899',
    },
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});
