import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import {
  Login as LoginIcon,
  Business as BusinessIcon,
  AdminPanelSettings as AdminIcon,
  Badge as BadgeIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    selectedDemo: ''
  });
  const [error, setError] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);
  
  const { login, loading } = useAuth();
  const navigate = useNavigate();

  // Demo account options
  const demoAccounts = [
    {
      role: 'admin',
      username: 'admin@gi-yatra.com',
      password: 'admin123',
      name: 'System Administrator',
      description: 'Full system access, user management, all dashboard features',
      icon: <AdminIcon sx={{ fontSize: 40, color: '#e74c3c' }} />
    },
    {
      role: 'association',
      username: 'udupi@association.com',
      password: 'udupi123',
      name: 'Udupi GI Association',
      description: 'File GI applications, report violations, view own submissions',
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#3498db' }} />
    },
    {
      role: 'association',
      username: 'mysore@association.com',
      password: 'mysore123',
      name: 'Mysore Silk Association',
      description: 'File GI applications, report violations, view own submissions',
      icon: <BusinessIcon sx={{ fontSize: 40, color: '#9b59b6' }} />
    },
    {
      role: 'officer',
      username: 'officer@giboard.gov.in',
      password: 'officer123',
      name: 'GI Registration Officer',
      description: 'Review applications, approve/reject, manage prosecution',
      icon: <BadgeIcon sx={{ fontSize: 40, color: '#27ae60' }} />
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleDemoAccountSelect = (account) => {
    setCredentials({
      username: account.username,
      password: account.password,
      selectedDemo: account.role
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!credentials.username || !credentials.password) {
      setError('Please enter both username and password');
      return;
    }

    const result = await login(credentials.username, credentials.password);
    
    if (result.success) {
      // Navigate to dashboard based on user role
      navigate('/dashboard');
    } else {
      setError(result.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Login Form */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={10}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)'
              }}
            >
              <Box textAlign="center" mb={3}>
                <img 
                  src="/icons/logo.png" 
                  alt="GI Yatra Logo" 
                  style={{ height: '60px', marginBottom: '16px' }}
                />
                <Typography variant="h4" fontWeight="bold" color="#2c3e50">
                  GI Yatra Admin Portal
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  Geographical Indication Management System
                </Typography>
              </Box>

              {error && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="Username / Email"
                  name="username"
                  value={credentials.username}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                  disabled={loading}
                />

                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={credentials.password}
                  onChange={handleInputChange}
                  margin="normal"
                  variant="outlined"
                  disabled={loading}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={loading}
                  startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                  sx={{
                    mt: 3,
                    mb: 2,
                    py: 1.5,
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #5a6fd8, #6a4190)'
                    }
                  }}
                >
                  {loading ? 'Signing In...' : 'Sign In'}
                </Button>
              </form>

              <Divider sx={{ my: 3 }}>
                <Typography variant="caption" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                sx={{ mb: 2 }}
              >
                {showDemoAccounts ? 'Hide Demo Accounts' : 'Show Demo Accounts'}
              </Button>

              {showDemoAccounts && (
                <Box mt={2}>
                  <Typography variant="subtitle2" color="text.secondary" mb={2}>
                    Select a demo account to explore different user roles:
                  </Typography>
                  
                  <FormControl fullWidth>
                    <InputLabel>Demo Account</InputLabel>
                    <Select
                      value={credentials.selectedDemo}
                      label="Demo Account"
                      onChange={(e) => {
                        const account = demoAccounts.find(acc => acc.role === e.target.value);
                        if (account) handleDemoAccountSelect(account);
                      }}
                    >
                      {demoAccounts.map((account, index) => (
                        <MenuItem key={index} value={account.role}>
                          {account.name} ({account.role})
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              )}
            </Paper>
          </Grid>

          {/* Demo Accounts Info */}
          <Grid item xs={12} md={6}>
            <Typography variant="h5" color="white" mb={3} fontWeight="bold">
              Demo User Accounts
            </Typography>
            
            {demoAccounts.map((account, index) => (
              <Card 
                key={index}
                sx={{ 
                  mb: 2, 
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 6
                  }
                }}
                onClick={() => handleDemoAccountSelect(account)}
              >
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    {account.icon}
                    <Box ml={2}>
                      <Typography variant="h6" fontWeight="bold">
                        {account.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Role: {account.role.toUpperCase()}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    {account.description}
                  </Typography>
                  
                  <Box 
                    sx={{ 
                      background: '#f8f9fa', 
                      p: 1, 
                      borderRadius: 1,
                      fontFamily: 'monospace',
                      fontSize: '0.8rem'
                    }}
                  >
                    <strong>Username:</strong> {account.username}<br />
                    <strong>Password:</strong> {account.password}
                  </Box>
                </CardContent>
              </Card>
            ))}

            <Box mt={3} p={3} sx={{ background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
              <Typography variant="h6" color="white" mb={2}>
                ✨ Platform Features
              </Typography>
              <Typography variant="body2" color="white" mb={1}>
                • GI Application Filing System
              </Typography>
              <Typography variant="body2" color="white" mb={1}>
                • Non-GI Product Violation Reporting
              </Typography>
              <Typography variant="body2" color="white" mb={1}>
                • Association Management Portal
              </Typography>
              <Typography variant="body2" color="white" mb={1}>
                • Trade Promotion Center Integration
              </Typography>
              <Typography variant="body2" color="white">
                • Prosecution Workflow Management
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default LoginPage;