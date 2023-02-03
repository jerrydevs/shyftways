import { useRouter } from 'next/router'
import { Divider, Drawer, List, ListItem, ListItemButton, ListItemText, Toolbar } from '@mui/material'

export default function Sidebar() {
  const router = useRouter();

  return (
    <Drawer
      variant='permanent'
      anchor='left'
      sx={{ width: '100px' }}
    >
      <Toolbar />
      <Divider />
      <List>
        <ListItem key='home'>
          <ListItemButton onClick={() => router.push('/')}>
            <ListItemText primary='Home' />
          </ListItemButton>
        </ListItem>
        <ListItem key='students'>
          <ListItemButton onClick={() => router.push('/students')}>
            <ListItemText primary='Students' />
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  )
}
