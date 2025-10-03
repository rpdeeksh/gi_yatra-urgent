import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  LinearProgress,
  Divider
} from '@mui/material';
import {
  Assignment as AssignmentIcon,
  Report as ReportIcon,
  People as PeopleIcon,
  Gavel as GavelIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  AccountCircle as AccountCircleIcon,
  ExitToApp as ExitToAppIcon,
  Description as DescriptionIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { dashboardService } from '../../services/mockApi';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentActivities, setRecentActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [statsResult, activitiesResult] = await Promise.all([
        dashboardService.getStats(),
        dashboardService.getRecentActivities()
      ]);

      if (statsResult.success) {
        setStats(statsResult.stats);
      }

      if (activitiesResult.success) {
        setRecentActivities(activitiesResult.activities);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'gi_application':
        return <AssignmentIcon color="primary" />;
      case 'violation_report':
        return <WarningIcon color="warning" />;
      case 'prosecution':
        return <GavelIcon color="error" />;
      case 'approval':
        return <CheckCircleIcon color="success" />;
      default:
        return <DescriptionIcon color="info" />;
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'error';
      case 'association':
        return 'primary';
      case 'officer':
        return 'success';
      default:
        return 'default';
    }
  };

  const StatCard = ({ title, value, icon, color, subtext }) => (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${color}15, ${color}25)`,
        border: `1px solid ${color}30`,
        transition: 'transform 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 4
        }
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography variant="h4" fontWeight="bold" color={color}>
              {value}
            </Typography>
            <Typography variant="h6" color="text.primary" fontWeight="medium">
              {title}
            </Typography>
            {subtext && (
              <Typography variant="body2" color="text.secondary">
                {subtext}
              </Typography>
            )}
          </Box>
          <Box 
            sx={{ 
              p: 2, 
              borderRadius: '50%', 
              background: `${color}20`,
              color: color
            }}
          >
            {icon}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
        <Typography variant="h6" textAlign="center" mt={2}>
          Loading Dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Navigation Bar */}
      <AppBar position="static" sx={{ background: 'linear-gradient(135deg, #667eea, #764ba2)' }}>
        <Toolbar>
          <img 
            src="/icons/logo.png" 
            alt="GI Yatra Logo" 
            style={{ height: '40px', marginRight: '16px' }}
          />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            GI Yatra - Administrative Dashboard
          </Typography>
          
          <Chip 
            label={user?.role?.toUpperCase()} 
            color={getRoleColor(user?.role)}
            variant="outlined"
            sx={{ mr: 2, color: 'white', borderColor: 'white' }}
          />
          
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
          >
            <Avatar sx={{ bgcolor: 'primary.dark' }}>
              {user?.name?.charAt(0)}
            </Avatar>
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <AccountCircleIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="subtitle2">{user?.name}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.organization}
                </Typography>
              </ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Dashboard Content */}
      <Box sx={{ p: 3, background: '#f5f5f5', minHeight: 'calc(100vh - 64px)' }}>
        {/* Welcome Section */}
        <Box mb={4}>
          <Typography variant="h4" fontWeight="bold" color="#2c3e50" gutterBottom>
            Welcome back, {user?.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            {user?.organization} • {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </Typography>
        </Box>

        {/* Statistics Cards */}
        {stats && (
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Total Users"
                value={stats.totalUsers}
                icon={<PeopleIcon />}
                color="#3498db"
                subtext="Registered users"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Active Applications"
                value={stats.activeApplications}
                icon={<AssignmentIcon />}
                color="#e74c3c"
                subtext="Under review"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Approved GI Products"
                value={stats.approvedGIProducts}
                icon={<CheckCircleIcon />}
                color="#27ae60"
                subtext="Successfully registered"
              />
            </Grid>
            <Grid item xs={12} sm={6} lg={3}>
              <StatCard
                title="Active Prosecutions"
                value={stats.prosecutionsActive}
                icon={<GavelIcon />}
                color="#f39c12"
                subtext="Legal proceedings"
              />
            </Grid>
          </Grid>
        )}

        <Grid container spacing={3}>
          {/* Quick Actions */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Quick Actions
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<AssignmentIcon />}
                    onClick={() => navigate('/gi-applications')}
                    sx={{ 
                      py: 2,
                      background: 'linear-gradient(45deg, #3498db, #2980b9)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #2980b9, #3498db)'
                      }
                    }}
                  >
                    GI Applications
                  </Button>
                </Grid>
                
                <Grid item xs={12} sm={6} md={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<ReportIcon />}
                    onClick={() => navigate('/violations')}
                    sx={{ 
                      py: 2,
                      background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #c0392b, #e74c3c)'
                      }
                    }}
                  >
                    Report Violations
                  </Button>
                </Grid>
                
                {user?.role === 'admin' && (
                  <Grid item xs={12} sm={6} md={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<PeopleIcon />}
                      onClick={() => navigate('/users')}
                      sx={{ 
                        py: 2,
                        background: 'linear-gradient(45deg, #9b59b6, #8e44ad)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #8e44ad, #9b59b6)'
                        }
                      }}
                    >
                      User Management
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Paper>

            {/* Additional Statistics */}
            {stats && (
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight="bold" mb={3}>
                  Platform Overview
                </Typography>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Box p={2} sx={{ background: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h5" color="#3498db" fontWeight="bold">
                        {stats.associationsConnected}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Connected Associations
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box p={2} sx={{ background: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h5" color="#27ae60" fontWeight="bold">
                        {stats.tradeCentersActive}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Active Trade Centers
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box p={2} sx={{ background: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h5" color="#e74c3c" fontWeight="bold">
                        {stats.violationsReported}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Violations Reported
                      </Typography>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <Box p={2} sx={{ background: '#f8f9fa', borderRadius: 2 }}>
                      <Typography variant="h5" color="#f39c12" fontWeight="bold">
                        {stats.pendingReviews}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Pending Reviews
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            )}
          </Grid>

          {/* Recent Activities */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight="bold" mb={3}>
                Recent Activities
              </Typography>
              
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        {getActivityIcon(activity.type)}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" fontWeight="medium">
                            {activity.message}
                          </Typography>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" color="text.secondary">
                              By: {activity.user}
                            </Typography>
                            <br />
                            <Typography variant="caption" color="text.secondary">
                              {formatTimestamp(activity.timestamp)}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;