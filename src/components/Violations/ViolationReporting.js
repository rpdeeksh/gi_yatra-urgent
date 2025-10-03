import React, { useState, useEffect, useCallback } from 'react';
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
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Gavel as GavelIcon,
  Warning as WarningIcon,
  FileDownload as FileDownloadIcon,
  Business as BusinessIcon,
  Security as SecurityIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import { violationService, fileService } from '../../services/mockApi';

const ViolationReporting = () => {
  const [violations, setViolations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedViolation, setSelectedViolation] = useState(null);
  const [prosecutionDialog, setProsecutionDialog] = useState(false);
  const [newViolation, setNewViolation] = useState({
    productName: '',
    violatorCompany: '',
    violationType: '',
    evidence: [],
    description: '',
    reportedBy: ''
  });
  const [prosecutionDetails, setProsecutionDetails] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { user } = useAuth();

  const loadViolations = useCallback(async () => {
    try {
      setLoading(true);
      let result;
      
      if (user?.role === 'admin' || user?.role === 'officer') {
        result = await violationService.getAllViolations();
      } else {
        result = await violationService.getMyViolations(user?.username);
      }

      if (result.success) {
        setViolations(result.violations);
      }
    } catch (error) {
      setErrorMessage('Error loading violation reports');
    } finally {
      setLoading(false);
    }
  }, [user?.role, user?.username]);

  useEffect(() => {
    loadViolations();
  }, [loadViolations]);

  const handleOpenNewViolation = () => {
    setNewViolation({
      productName: '',
      violatorCompany: '',
      violationType: '',
      evidence: [],
      description: '',
      reportedBy: user?.username || ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewViolation({
      productName: '',
      violatorCompany: '',
      violationType: '',
      evidence: [],
      description: '',
      reportedBy: ''
    });
    setErrorMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewViolation(prev => ({
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
        setNewViolation(prev => ({
          ...prev,
          evidence: [...prev.evidence, ...result.files.map(f => f.fileName)]
        }));
        setSuccessMessage(`${files.length} evidence files uploaded successfully`);
      }
    } catch (error) {
      setErrorMessage('Error uploading evidence files');
    } finally {
      setUploadingFiles(false);
    }
  };

  const handleSubmitViolation = async () => {
    if (!newViolation.productName || !newViolation.violatorCompany || !newViolation.violationType) {
      setErrorMessage('Please fill in all required fields');
      return;
    }

    try {
      const result = await violationService.reportViolation(newViolation);
      if (result.success) {
        setSuccessMessage(`Violation reported successfully! ID: ${result.violationId}`);
        handleCloseDialog();
        loadViolations();
      } else {
        setErrorMessage(result.message || 'Error reporting violation');
      }
    } catch (error) {
      setErrorMessage('Error reporting violation');
    }
  };

  const handleInitiateProsecution = async (violationId) => {
    if (!prosecutionDetails) {
      setErrorMessage('Please provide prosecution details');
      return;
    }

    try {
      const result = await violationService.initiateProsecution(violationId, prosecutionDetails);
      if (result.success) {
        setSuccessMessage('Prosecution proceedings initiated successfully');
        setProsecutionDialog(false);
        setProsecutionDetails('');
        loadViolations();
      } else {
        setErrorMessage(result.message || 'Error initiating prosecution');
      }
    } catch (error) {
      setErrorMessage('Error initiating prosecution');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'prosecution_initiated':
        return 'error';
      case 'under_investigation':
        return 'warning';
      case 'reported':
        return 'info';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const getViolationTypeColor = (type) => {
    switch (type) {
      case 'trademark_infringement':
        return 'error';
      case 'geographical_misuse':
        return 'warning';
      case 'quality_violation':
        return 'info';
      case 'unauthorized_use':
        return 'secondary';
      default:
        return 'primary';
    }
  };

  const violationTypes = [
    'trademark_infringement',
    'geographical_misuse',
    'quality_violation',
    'unauthorized_use',
    'false_advertising',
    'counterfeit_products'
  ];

  const getProsecutionSteps = (violation) => {
    const steps = [
      'Violation Reported',
      'Investigation Assigned',
      'Evidence Reviewed',
      'Legal Notice Sent',
      'Court Proceedings',
      'Resolution'
    ];

    const currentStep = () => {
      switch (violation.prosecutionStatus) {
        case 'pending':
          return 0;
        case 'investigation_assigned':
          return 1;
        case 'evidence_review':
          return 2;
        case 'notice_served':
          return 3;
        case 'court_proceedings':
          return 4;
        case 'resolved':
          return 5;
        default:
          return 0;
      }
    };

    return { steps, currentStep: currentStep() };
  };

  if (loading) {
    return (
      <Box sx={{ width: '100%', mt: 2 }}>
        <LinearProgress />
        <Typography variant="h6" textAlign="center" mt={2}>
          Loading Violation Reports...
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
            Non-GI Product Violation Reporting
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Report and manage unauthorized use of GI products
          </Typography>
        </Box>

        {(user?.role === 'association' || user?.role === 'admin') && (
          <Button
            variant="contained"
            startIcon={<WarningIcon />}
            onClick={handleOpenNewViolation}
            size="large"
            sx={{
              background: 'linear-gradient(45deg, #e74c3c, #c0392b)',
              '&:hover': {
                background: 'linear-gradient(45deg, #c0392b, #e74c3c)'
              }
            }}
          >
            Report Violation
          </Button>
        )}
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #e74c3c15, #e74c3c25)' }}>
            <CardContent>
              <Typography variant="h4" color="#e74c3c" fontWeight="bold">
                {violations.length}
              </Typography>
              <Typography variant="h6">Total Violations</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #f39c1215, #f39c1225)' }}>
            <CardContent>
              <Typography variant="h4" color="#f39c12" fontWeight="bold">
                {violations.filter(v => v.status === 'under_investigation').length}
              </Typography>
              <Typography variant="h6">Under Investigation</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #9b59b615, #9b59b625)' }}>
            <CardContent>
              <Typography variant="h4" color="#9b59b6" fontWeight="bold">
                {violations.filter(v => v.status === 'prosecution_initiated').length}
              </Typography>
              <Typography variant="h6">Prosecution Active</Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #27ae6015, #27ae6025)' }}>
            <CardContent>
              <Typography variant="h4" color="#27ae60" fontWeight="bold">
                {violations.filter(v => v.status === 'resolved').length}
              </Typography>
              <Typography variant="h6">Resolved</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Violations Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell><strong>Violation ID</strong></TableCell>
                <TableCell><strong>Product Name</strong></TableCell>
                <TableCell><strong>Violator Company</strong></TableCell>
                <TableCell><strong>Violation Type</strong></TableCell>
                <TableCell><strong>Reported By</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Reported Date</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {violations.map((violation) => (
                <TableRow key={violation.id} hover>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {violation.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" fontWeight="medium">
                      {violation.productName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <BusinessIcon sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2">
                        {violation.violatorCompany}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={violation.violationType.replace('_', ' ').toUpperCase()} 
                      size="small" 
                      color={getViolationTypeColor(violation.violationType)}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {violation.reportedBy}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={violation.status.replace('_', ' ').toUpperCase()}
                      color={getStatusColor(violation.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    {new Date(violation.reportedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="View Details">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => setSelectedViolation(violation)}
                      >
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    
                    {(user?.role === 'admin' || user?.role === 'officer') && 
                     violation.status !== 'prosecution_initiated' && (
                      <Tooltip title="Initiate Prosecution">
                        <IconButton 
                          size="small" 
                          color="error"
                          onClick={() => {
                            setSelectedViolation(violation);
                            setProsecutionDialog(true);
                          }}
                        >
                          <GavelIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    
                    {violation.evidence.length > 0 && (
                      <Tooltip title="Download Evidence">
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

      {/* New Violation Dialog */}
      <Dialog 
        open={openDialog} 
        onClose={handleCloseDialog} 
        maxWidth="md" 
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Report Non-GI Product Violation
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Fake/Unauthorized Product Name"
                name="productName"
                value={newViolation.productName}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Violator Company/Entity"
                name="violatorCompany"
                value={newViolation.violatorCompany}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth required>
                <InputLabel>Violation Type</InputLabel>
                <Select
                  name="violationType"
                  value={newViolation.violationType}
                  onChange={handleInputChange}
                  label="Violation Type"
                >
                  {violationTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.replace('_', ' ').toUpperCase()}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Reported By"
                name="reportedBy"
                value={newViolation.reportedBy}
                onChange={handleInputChange}
                disabled
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Violation Description"
                name="description"
                value={newViolation.description}
                onChange={handleInputChange}
                multiline
                rows={4}
                placeholder="Describe the violation, impact on authentic GI products, and any additional details..."
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <Box 
                sx={{ 
                  border: '2px dashed #e74c3c', 
                  borderRadius: 2, 
                  p: 3, 
                  textAlign: 'center',
                  background: '#ffeaa715'
                }}
              >
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  style={{ display: 'none' }}
                  id="evidence-upload"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.zip"
                />
                <label htmlFor="evidence-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    color="error"
                    startIcon={<SecurityIcon />}
                    disabled={uploadingFiles}
                  >
                    {uploadingFiles ? 'Uploading Evidence...' : 'Upload Evidence'}
                  </Button>
                </label>
                
                <Typography variant="body2" color="text.secondary" mt={2}>
                  Upload photos, documents, marketplace listings, or other evidence
                </Typography>
                
                {newViolation.evidence.length > 0 && (
                  <Box mt={2}>
                    <Typography variant="subtitle2" mb={1}>
                      Evidence Files:
                    </Typography>
                    {newViolation.evidence.map((evidence, index) => (
                      <Chip
                        key={index}
                        label={evidence}
                        size="small"
                        color="error"
                        variant="outlined"
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
            color="error"
            onClick={handleSubmitViolation}
            disabled={uploadingFiles}
          >
            Report Violation
          </Button>
        </DialogActions>
      </Dialog>

      {/* Violation Details Dialog */}
      <Dialog
        open={!!selectedViolation && !prosecutionDialog}
        onClose={() => setSelectedViolation(null)}
        maxWidth="lg"
        fullWidth
      >
        {selectedViolation && (
          <>
            <DialogTitle>
              <Typography variant="h6" fontWeight="bold">
                Violation Details - {selectedViolation.id}
              </Typography>
            </DialogTitle>
            
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Product Name
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedViolation.productName}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Violator Company
                      </Typography>
                      <Typography variant="body1" fontWeight="medium">
                        {selectedViolation.violatorCompany}
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Violation Type
                      </Typography>
                      <Chip
                        label={selectedViolation.violationType.replace('_', ' ').toUpperCase()}
                        color={getViolationTypeColor(selectedViolation.violationType)}
                        size="small"
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Status
                      </Typography>
                      <Chip
                        label={selectedViolation.status.replace('_', ' ').toUpperCase()}
                        color={getStatusColor(selectedViolation.status)}
                        size="small"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Action Taken
                      </Typography>
                      <Typography variant="body1">
                        {selectedViolation.actionTaken}
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                
                <Grid item xs={12} md={4}>
                  <Typography variant="subtitle2" color="text.secondary" mb={2}>
                    Prosecution Timeline
                  </Typography>
                  
                  <Stepper 
                    activeStep={getProsecutionSteps(selectedViolation).currentStep} 
                    orientation="vertical"
                    sx={{ background: '#f8f9fa', p: 2, borderRadius: 1 }}
                  >
                    {getProsecutionSteps(selectedViolation).steps.map((label, index) => (
                      <Step key={label}>
                        <StepLabel>
                          <Typography variant="body2">
                            {label}
                          </Typography>
                        </StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </Grid>
              </Grid>
            </DialogContent>
            
            <DialogActions>
              <Button onClick={() => setSelectedViolation(null)}>
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Prosecution Dialog */}
      <Dialog
        open={prosecutionDialog}
        onClose={() => setProsecutionDialog(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6" fontWeight="bold">
            Initiate Prosecution Proceedings
          </Typography>
        </DialogTitle>
        
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 3 }}>
            This action will initiate legal proceedings against the violator. 
            Ensure all evidence has been reviewed and the case is ready for prosecution.
          </Alert>
          
          {selectedViolation && (
            <Box mb={3}>
              <Typography variant="subtitle2" color="text.secondary">
                Violation: {selectedViolation.productName} by {selectedViolation.violatorCompany}
              </Typography>
            </Box>
          )}
          
          <TextField
            fullWidth
            label="Prosecution Details"
            value={prosecutionDetails}
            onChange={(e) => setProsecutionDetails(e.target.value)}
            multiline
            rows={6}
            placeholder="Enter legal grounds, charges, and prosecution strategy..."
            required
          />
        </DialogContent>
        
        <DialogActions>
          <Button onClick={() => setProsecutionDialog(false)}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            color="error"
            onClick={() => handleInitiateProsecution(selectedViolation?.id)}
            startIcon={<GavelIcon />}
          >
            Initiate Prosecution
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ViolationReporting;