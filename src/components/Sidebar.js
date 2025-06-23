import React, { useState } from 'react';
import { Drawer, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography, useTheme, IconButton, Avatar, Divider, Tooltip } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import TableChartIcon from '@mui/icons-material/TableChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Tables', icon: <TableChartIcon />, path: '/tables' },
  { text: 'Charts', icon: <BarChartIcon />, path: '/charts' },
  { text: 'Calendar', icon: <CalendarMonthIcon />, path: '/calendar' },
  { text: 'Kanban', icon: <ViewKanbanIcon />, path: '/kanban' },
];

export default function Sidebar() {
  const location = useLocation();
  const theme = useTheme();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: collapsed ? 72 : 220,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? 72 : 220,
          boxSizing: 'border-box',
          background: theme.palette.mode === 'dark' ? '#181c24' : '#f4f6f8',
          borderRight: 0,
          transition: 'width 0.3s',
          overflowX: 'hidden',
        },
      }}
    >
      {/* Profile Section */}
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 3 }}>
        <Avatar src="https://i.pravatar.cc/100" sx={{ width: 48, height: 48, mb: 1 }} />
        {!collapsed && (
          <>
            <Typography variant="subtitle1" fontWeight={700}>John Doe</Typography>
            <Typography variant="caption" color="text.secondary">Admin</Typography>
          </>
        )}
      </Box>
      <Divider sx={{ mb: 1 }} />
      <List>
        {menuItems.map((item) => (
          <Tooltip title={collapsed ? item.text : ''} placement="right" key={item.text} arrow>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                my: 1,
                mx: 2,
                borderRadius: 2,
                color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                background: location.pathname === item.path ? theme.palette.action.selected : 'none',
                '&:hover': {
                  background: theme.palette.action.hover,
                  color: 'primary.main',
                },
                transition: 'all 0.2s',
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: collapsed ? 1 : 2,
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 0, mr: collapsed ? 0 : 2, justifyContent: 'center' }}>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItemButton>
          </Tooltip>
        ))}
      </List>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
        <IconButton onClick={() => setCollapsed((prev) => !prev)}>
          {collapsed ? <MenuIcon /> : <MenuOpenIcon />}
        </IconButton>
      </Box>
    </Drawer>
  );
} 