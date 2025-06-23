import React from 'react';
import { Box, Typography, Paper, Grid, Avatar, Stack, List, ListItem, ListItemAvatar, ListItemText, IconButton, Tooltip } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PeopleIcon from '@mui/icons-material/People';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Feb', uv: 300, pv: 1398, amt: 2210 },
  { name: 'Mar', uv: 200, pv: 9800, amt: 2290 },
  { name: 'Apr', uv: 278, pv: 3908, amt: 2000 },
  { name: 'May', uv: 189, pv: 4800, amt: 2181 },
  { name: 'Jun', uv: 239, pv: 3800, amt: 2500 },
];
const pieData = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const stats = [
  { label: 'Revenue', value: '$21,000', icon: <AttachMoneyIcon />, color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
  { label: 'Users', value: '1,200', icon: <PeopleIcon />, color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
  { label: 'Sales', value: '3,400', icon: <ShoppingCartIcon />, color: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)' },
  { label: 'Growth', value: '+12%', icon: <TrendingUpIcon />, color: 'linear-gradient(135deg, #f953c6 0%, #b91d73 100%)' },
];

const activities = [
  { id: 1, icon: <PeopleIcon color="primary" />, text: 'New user registered', time: '2 min ago' },
  { id: 2, icon: <ShoppingCartIcon color="secondary" />, text: 'Order #1234 placed', time: '10 min ago' },
  { id: 3, icon: <AttachMoneyIcon color="success" />, text: 'Payment received', time: '1 hr ago' },
  { id: 4, icon: <TrendingUpIcon color="error" />, text: 'Sales up 12%', time: 'Today' },
];

export default function Dashboard() {
  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'center' }} mb={2} gap={2}>
        <Typography variant="h4">Welcome to the Admin Dashboard</Typography>
        <Stack direction="row" spacing={1}>
          <Tooltip title="Add New">
            <IconButton color="primary"><AddIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Refresh">
            <IconButton color="secondary"><RefreshIcon /></IconButton>
          </Tooltip>
          <Tooltip title="Notifications">
            <IconButton color="info"><NotificationsIcon /></IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      {/* Stat Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }} alignItems="stretch">
        {stats.map((stat, i) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label} sx={{ display: 'flex' }}>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{ width: '100%', display: 'flex' }}
            >
              <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', background: stat.color, color: '#fff', boxShadow: 3, borderRadius: 3, cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px) scale(1.03)', boxShadow: 6 }, width: '100%', minHeight: 110 }}>
                <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', mr: 2 }}>{stat.icon}</Avatar>
                <Box>
                  <Typography variant="h6" fontWeight={700}>{stat.value}</Typography>
                  <Typography variant="body2">{stat.label}</Typography>
                </Box>
              </Paper>
            </motion.div>
          </Grid>
        ))}
        {/* Notifications Card */}
        <Grid item xs={12} sm={6} md={3} sx={{ display: 'flex' }}>
          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ width: '100%', display: 'flex' }}>
            <Paper sx={{ p: 2, boxShadow: 3, borderRadius: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', bgcolor: 'info.light', color: 'info.contrastText', width: '100%', minHeight: 110 }}>
              <NotificationsIcon fontSize="large" sx={{ mb: 1 }} />
              <Typography variant="h6">3 New Notifications</Typography>
              <Typography variant="body2">Check your latest updates</Typography>
            </Paper>
          </motion.div>
        </Grid>
      </Grid>
      {/* Charts and Activity */}
      <Grid container spacing={3} alignItems="stretch">
        <Grid item xs={12} md={8} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, flex: 1, minHeight: 370, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>Monthly Data Overview</Typography>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Line type="monotone" dataKey="pv" stroke="#8884d8" />
                  <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, flex: 1, minHeight: 370, display: 'flex', flexDirection: 'column', boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>Recent Activity</Typography>
            <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <List>
                {activities.map((activity) => (
                  <ListItem key={activity.id}>
                    <ListItemAvatar>
                      <Avatar>{activity.icon}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={activity.text} secondary={activity.time} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, flex: 1, minHeight: 370, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>Sales Bar Chart</Typography>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Legend />
                  <Bar dataKey="pv" fill="#8884d8" />
                  <Bar dataKey="uv" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
          <Paper sx={{ p: 2, flex: 1, minHeight: 370, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 3, borderRadius: 3 }}>
            <Typography variant="h6" mb={2}>Pie Chart</Typography>
            <Box sx={{ flex: 1, minHeight: 0 }}>
              <ResponsiveContainer width="100%" height={260}>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label>
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
} 