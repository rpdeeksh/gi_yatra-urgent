import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  LinearProgress,
  IconButton,
  Tooltip,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  CloudUpload as CloudUploadIcon,
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  HourglassEmpty as HourglassEmptyIcon,
  Cancel as CancelIcon,
  FileDownload as FileDownloadIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { giApplicationService, fileService } from '../../services/mockApi';

const GIApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [newApplication, setNewApplication] = useState({
    productName: '',
    applicantName: '',
    category: '',
    district: '',
    description: '',
    documents: []
  });
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    try {
      setLoading(true);
      let result;
      
      if (user?.role === 'admin' || user?.role === 'officer') {
        result = await giApplicationService.getAllApplications();
      } else {
        result = await giApplicationService.getMyApplications(user?.username);
      }

      if (result.success) {
        setApplications(result.applications);
      }
    } catch (error) {
      setErrorMessage('Error loading applications');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenNewApplication = () => {
    setNewApplication({
      productName: '',
      applicantName: user?.name || '',
      applicantEmail: user?.username || '',
      category: '',
      district: '',
      description: '',
      documents: []
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedApplication(null);
    setNewApplication({
      productName: '',
      applicantName: '',
      category: '',
      district: '',
      description: '',
      documents: []
    });
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewApplication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    setUploadingFiles(true);
    try {
      const result = await fileService.uploadMultipleFiles(files);
      if (result.success) {
        setNewApplication(prev => ({
          ...prev,
          documents: [...prev.documents, ...result.files.map(f => f.fileName)]
        }));
        setSuccessMessage(`${files.length} files uploaded successfully`);
      }
    } catch (error) {
      setErrorMessage('Error uploading files');
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleSubmitApplication = async () => {
    if (!newApplication.productName || !newApplication.category || !newApplication.district) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const result = await giApplicationService.submitApplication(newApplication);
      if (result.success) {
        setSuccessMessage(`Application submitted successfully! ID: ${result.applicationId}`);
        handleCloseDialog();
        loadApplications();
      } else {
        setErrorMessage(result.message || 'Error submitting application');
      }
    } catch (error) {
      setErrorMessage('Error submitting application');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'error';
      case 'under_review':
        return 'warning';
      case 'submitted':
        return 'info';
      default:
        return 'default';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircleIcon />;
      case 'rejected':
        return <CancelIcon />;
      case 'under_review':
        return <HourglassEmptyIcon />;
      case 'submitted':
        return <AssignmentIcon />;
      default:
        return <AssignmentIcon />;
    }
  };

  const categories = [
    'Agricultural',
    'Handicraft',
    'Textiles',
    'Food Products',
    'Natural Products',
    'Manufactured Goods'
  ];

  const districts = [
    'Bagalkot', 'Ballari', 'Belagavi', 'Bengaluru Rural', 'Bengaluru Urban',
    'Bidar', 'Chamarajanagar', 'Chikballapur', 'Chikkamagaluru', 'Chitradurga',
    'Dakshina Kannada', 'Davanagere', 'Dharwad', 'Gadag', 'Hassan',
    'Haveri', 'Kalaburagi', 'Kodagu', 'Kolar', 'Koppal',
    'Mandya', 'Mysuru', 'Raichur', 'Ramanagara', 'Shivamogga',
    'Tumakuru', 'Udupi', 'Uttara Kannada', 'Vijayapura', 'Yadgir'
  ];

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
        <Typography variant="h6" textAlign="center" mt={2}>
          Loading GI Applications...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }} onClose={() => setSuccessMessage('')}>
          {successMessage}
        </Alert>
      )}

      {errorMessage && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setErrorMessage('')}>
          {errorMessage}
        </Alert>
      )}

      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Box>
          <Typography variant="h4" fontWeight="bold" color="#2c3e50">
            GI Applications Management
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            File and manage Geographical Indication applications
          </Typography>
        </Box>

        {(user?.role === 'association' || user?.role === 'admin') && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenNewApplication}
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #3498db, #2980b9)',
              '&:hover': {
                background: 'linear-gradient(45deg, #2980b9, #3498db)'
              }
            }}
          >
            New GI Application
          </Button>
        )}
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #3498db15, #3498db25)' }}>
            <CardContent>
              <Typography variant="h4" color="#3498db" fontWeight="bold">
                {applications.length}
              </Typography>
              <Typography variant="h6">Total Applications</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #27ae6015, #27ae6025)' }}>
            <CardContent>
              <Typography variant="h4" color="#27ae60" fontWeight="bold">
                {applications.filter(app => app.status === 'approved').length}
              </Typography>
              <Typography variant="h6">Approved</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f39c1215, #f39c1225)' }}>
            <CardContent>
              <Typography variant="h4" color="#f39c12" fontWeight="bold">
                {applications.filter(app => app.status === 'under_review').length}
              </Typography>
              <Typography variant="h6">Under Review</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #e74c3c15, #e74c3c25)' }}>
            <CardContent>
              <Typography variant="h4" color="#e74c3c" fontWeight="bold">
                {applications.filter(app => app.status === 'rejected').length}
              </Typography>
              <Typography variant="h6">Rejected</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Applications Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><strong>Application ID</strong></TableCell>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Category</strong></TableCell>
                <TableCell><strong>District</strong></TableCell>
                <TableCell><strong>Applicant</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Submitted Date</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.map((application) => (
                <TableRow key={application.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {application.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {application.productName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={application.category} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{application.district}</TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {application.applicantName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {application.applicantEmail}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={getStatusIcon(application.status)}
                      label={application.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(application.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(application.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => setSelectedApplication(application)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    
                    {application.documents.length > 0 && (
                      <Tooltip title="Download Documents">
                        <IconButton size="small" color="secondary">
                          <FileDownloadIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* New Application Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Submit New GI Application
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Product Name"
                name="productName"
                value={newApplication.productName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Applicant Name"
                name="applicantName"
                value={newApplication.applicantName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Category</InputLabel>
                <Select
                  name="category"
                  value={newApplication.category}
                  onChange={handleInputChange}
                  label="Category"
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>District</InputLabel>
                <Select
                  name="district"
                  value={newApplication.district}
                  onChange={handleInputChange}
                  label="District"
                >
                  {districts.map((district) => (
                    <MenuItem key={district} value={district}>
                      {district}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Description"
                name="description"
                value={newApplication.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  border: '2px dashed #ccc', 
                  borderRadius: 2, 
                  p: 3, 
                  textAlign: 'center',
                  background: '#f8f9fa'
                }}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="file-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                <label htmlFor="file-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                    disabled={uploadingFiles}
                  >
                    {uploadingFiles ? 'Uploading...' : 'Upload Documents'}
                  </Button>
                </label>
                
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Upload supporting documents (PDF, DOC, Images)
                </Typography>
                
                {newApplication.documents.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="subtitle2" mb={1}>
                      Uploaded Files:
                    </Typography>
                    {newApplication.documents.map((doc, index) => (
                      <Chip
                        key={index}
                        label={doc}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleCloseDialog}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmitApplication}
            disabled={uploadingFiles}
          >
            Submit Application
          </Button>
        </DialogActions>
      </Dialog>

      {/* Application Details Dialog */}
      <Dialog
        open={!!selectedApplication}
        onClose={() => setSelectedApplication(null)}
        maxWidth="md"
        fullWidth
      >
        {selectedApplication && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight="bold">
                Application Details - {selectedApplication.id}
              </Typography>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Product Name
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {selectedApplication.productName}
                  </Typography>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Status
                  </Typography>
                  <Chip
                    icon={getStatusIcon(selectedApplication.status)}
                    label={selectedApplication.status.replace('_', ' ').toUpperCase()}
                    color={getStatusColor(selectedApplication.status)}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Description
                  </Typography>
                  <Typography variant="body1">
                    {selectedApplication.description}
                  </Typography>
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Trade Center Remarks
                  </Typography>
                  <Typography variant="body1">
                    {selectedApplication.tradeCenterRemarks}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setSelectedApplication(null)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default GIApplications;