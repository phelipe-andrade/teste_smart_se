import React, {useState} from 'react';
import { useRouter } from 'next/router';
import {AppBar, Box, Toolbar, Menu, Typography, IconButton, Container, Button, Tooltip, MenuItem} from '@mui/material';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { UserValidLogin } from '@/protocols/UserLogin';
import SvgIcon from '@mui/material/SvgIcon';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { loginUser } from '@/store/user';
import MenuMobile from './MenuMobile';
import { deleteLocalStorage } from '@/helper/localStorage';

export interface IPage {
    text: string;
    link: string;
}
const pages: IPage[] = [{text: 'Veículos', link: 'vehicle/list'}, {text: 'Abastecimentos', link: 'supply/list'}];

export default function ResponsiveAppBar() {
  const router = useRouter();
  const { login } = useSelector((state: UserValidLogin) => state.user);
  const dispatch = useDispatch();

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    handleCloseUserMenu();
    if(login){
      dispatch(loginUser({login: false}));
      deleteLocalStorage('token');
      router.push("/users/login");
    };
  }

  return (
    <AppBar position="static"  sx={{ bgcolor: '#1976d2'}}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Link href='/'>       
            <Typography
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                textDecoration: 'none',
                color: "#fff"
              }}
            >
              CAR | 
            </Typography>
          </Link>
          <MenuMobile pages={pages} handleCloseNavMenu={handleCloseNavMenu} handleOpenNavMenu={handleOpenNavMenu} anchorElNav={anchorElNav}/>
          

          <Typography
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              textDecoration: 'none',
              color: "#fff"
            }}
          >
            CAR
          </Typography>
       
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(({text, link}) => (
                <Link href={`/${link}`} key={text}>
                    <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                >
                    {text}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Conta">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <SvgIcon sx={{color: "#fff", fontSize: "larger"}}>
                <AccountCircleIcon/>
              </SvgIcon>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            { login ? 
                <MenuItem  onClick={handleLogout}>
                <Typography textAlign="center">Logout</Typography>
                </MenuItem>
              :
              <span>
                <Link href={`/users/login`}>
                  <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Login</Typography>
                  </MenuItem>
                </Link>
                  <Link href={`/users/register`}>
                  <MenuItem  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Cadastre-se</Typography>
                  </MenuItem>
                 </Link>
              </span>
            }
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
