import { Box, Menu, Typography, IconButton, MenuItem} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IPage } from '.';
import Link from 'next/link';

export default function MenuMobile(props: {pages: IPage[], handleOpenNavMenu: (event: React.MouseEvent<HTMLElement>) => void, handleCloseNavMenu: () => void, anchorElNav: null | HTMLElement }) {
  const {pages, anchorElNav, handleOpenNavMenu, handleCloseNavMenu} = props;

  return <>
    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        {pages.map(({text, link}) => (
          <Link href={`/${link}`} key={text}>
              <MenuItem onClick={handleCloseNavMenu}>
              <Typography textAlign="center">{text}</Typography>
              </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  </>
}