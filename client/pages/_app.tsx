import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Sidebar from '@/components/Sidebar'
import { Box } from '@mui/system'
import { Typography } from '@mui/material'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: '100px', mt: '50px' }}>
        <Typography variant='h2'>Student Result Management</Typography>
        <Component {...pageProps} />
      </Box>
    </Box>
  )
}
