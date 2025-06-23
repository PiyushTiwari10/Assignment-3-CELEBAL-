import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Badge, Box, InputBase, Menu, MenuItem, alpha, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar({ darkMode, toggleTheme }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // Determine icon/text color based on theme
  const iconColor = theme.palette.mode === 'light' ? '#222' : '#fff';
  const avatarBorder = theme.palette.mode === 'light' ? '2px solid #1976d2' : '2px solid #43e97b';

  return (
    <AppBar
      position="static"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'rgba(24,28,36,0.85)'
            : 'rgba(255,255,255,0.95)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.10)',
        backdropFilter: 'blur(12px)',
        border: 0,
        minHeight: 64,
        width: '100%',
        borderRadius: 0,
        mx: 0,
        mt: 0,
      }}
      elevation={0}
    >
      {/* Gradient accent bar */}
      <Box sx={{ height: 4, width: '100%', background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)' }} />
      <Toolbar sx={{ minHeight: 60, px: { xs: 1, sm: 3 } }}>
        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            color: iconColor,
            fontWeight: 800,
            letterSpacing: 1.5,
            fontFamily: 'Poppins, Roboto, sans-serif',
            display: { xs: 'none', sm: 'block' },
            textShadow: theme.palette.mode === 'light' ? '0 1px 8px rgba(67,233,123,0.04)' : '0 1px 8px rgba(67,233,123,0.08)',
          }}
        >
          Admin Dashboard
        </Typography>
        {/* Search Bar */}
        <Box
          sx={{
            position: 'relative',
            borderRadius: 2,
            backgroundColor: (theme) => alpha(theme.palette.action.selected, 0.7),
            mr: 2,
            ml: 2,
            width: { xs: '100px', sm: '200px', md: '300px' },
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            boxShadow: 1,
            transition: 'box-shadow 0.2s',
            '&:focus-within': { boxShadow: 3 },
          }}
        >
          <SearchIcon sx={{ ml: 1, mr: 1, color: iconColor }} />
          <InputBase placeholder="Search…" sx={{ color: iconColor, width: '100%' }} inputProps={{ 'aria-label': 'search' }} />
        </Box>
        <IconButton color="inherit" sx={{ mr: 1, transition: 'background 0.2s', '&:hover': { background: 'rgba(67,233,123,0.12)' }, color: iconColor }} onClick={toggleTheme}>
          {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
        <IconButton color="inherit" sx={{ mr: 1, transition: 'background 0.2s', '&:hover': { background: 'rgba(67,233,123,0.12)' }, color: iconColor }}>
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {/* User Menu */}
        <Box>
          <IconButton onClick={handleMenu} sx={{ p: 0, transition: 'box-shadow 0.2s', '&:hover': { boxShadow: 3 } }}>
            <Avatar alt="User" src="https://i.pravatar.cc/300" sx={{ width: 36, height: 36, border: avatarBorder, transition: 'border 0.2s' }} />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 2,
              sx: { mt: 1.5, minWidth: 150, borderRadius: 2 },
            }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem>Profile</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
} 