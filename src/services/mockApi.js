// Mock API Service for GI Yatra Backend Simulation
// This simulates backend functionality with realistic data and delays

// Mock Users Database
const mockUsers = [
  {
    id: 1,
    username: 'admin@gi-yatra.com',
    password: 'admin123',
    role: 'admin',
    name: 'System Administrator',
    organization: 'GI Yatra Central',
    status: 'active',
    createdAt: '2024-01-15T00:00:00Z'
  },
  {
    id: 2,
    username: 'udupi@association.com',
    password: 'udupi123',
    role: 'association',
    name: 'Udupi GI Association',
    organization: 'Udupi Trade Promotion Council',
    status: 'active',
    createdAt: '2024-02-01T00:00:00Z'
  },
  {
    id: 3,
    username: 'mysore@association.com',
    password: 'mysore123',
    role: 'association',
    name: 'Mysore Silk Association',
    organization: 'Karnataka Silk Board',
    status: 'active',
    createdAt: '2024-02-15T00:00:00Z'
  },
  {
    id: 4,
    username: 'officer@giboard.gov.in',
    password: 'officer123',
    role: 'officer',
    name: 'GI Registration Officer',
    organization: 'Geographic Indications Registry',
    status: 'active',
    createdAt: '2024-01-10T00:00:00Z'
  }
];

// Mock GI Applications Database
let mockGIApplications = [
  {
    id: 'GI001',
    productName: 'Udupi Mallige Premium',
    applicantName: 'Udupi Flower Growers Association',
    applicantEmail: 'udupi@association.com',
    category: 'Agricultural',
    district: 'Udupi',
    description: 'Premium jasmine flowers with unique fragrance properties',
    documents: ['certificate.pdf', 'geographical-proof.pdf', 'quality-standards.pdf'],
    status: 'under_review',
    submittedAt: '2024-09-15T10:30:00Z',
    reviewedBy: null,
    tradeCenterRemarks: 'Pending documentation verification',
    prosecutionHistory: []
  },
  {
    id: 'GI002',
    productName: 'Channapatna Eco Toys',
    applicantName: 'Channapatna Artisan Collective',
    applicantEmail: 'channapatna@artisans.com',
    category: 'Handicraft',
    district: 'Ramanagara',
    description: 'Traditional wooden toys made with eco-friendly lacquer',
    documents: ['artisan-certificate.pdf', 'traditional-methods.pdf'],
    status: 'approved',
    submittedAt: '2024-08-20T14:15:00Z',
    reviewedBy: 'officer@giboard.gov.in',
    tradeCenterRemarks: 'Excellent documentation and verification completed',
    prosecutionHistory: []
  }
];

// Mock Non-GI Product Violations Database
let mockViolations = [
  {
    id: 'NONGI001',
    productName: 'Fake Mysore Silk Sarees',
    violatorCompany: 'QuickSilk Textiles Pvt Ltd',
    reportedBy: 'mysore@association.com',
    violationType: 'trademark_infringement',
    evidence: ['photos.zip', 'marketplace-listing.pdf', 'customer-complaints.pdf'],
    status: 'prosecution_initiated',
    reportedAt: '2024-09-28T09:45:00Z',
    actionTaken: 'Legal notice sent to violator',
    associationNotified: true,
    prosecutionStatus: 'notice_served'
  },
  {
    id: 'NONGI002',
    productName: 'Imitation Bidriware Items',
    violatorCompany: 'Modern Crafts Online',
    reportedBy: 'bidar@association.com',
    violationType: 'geographical_misuse',
    evidence: ['product-images.jpg', 'website-screenshots.pdf'],
    status: 'under_investigation',
    reportedAt: '2024-10-01T16:20:00Z',
    actionTaken: 'Investigation assigned to field officer',
    associationNotified: true,
    prosecutionStatus: 'pending'
  }
];

// Mock Dashboard Statistics
const mockDashboardStats = {
  totalUsers: 67,
  activeApplications: 23,
  approvedGIProducts: 156,
  pendingReviews: 8,
  violationsReported: 12,
  prosecutionsActive: 5,
  associationsConnected: 15,
  tradeCentersActive: 8
};

// Simulate API delay for realistic experience
const simulateDelay = (ms = 1000) => new Promise(resolve => setTimeout(resolve, ms));

// Authentication Service
export const authService = {
  // Login function
  login: async (username, password) => {
    await simulateDelay(1500);
    
    const user = mockUsers.find(u => u.username === username && u.password === password);
    if (user) {
      const { password: _, ...userWithoutPassword } = user;
      const token = `mock_token_${user.id}_${Date.now()}`;
      
      // Store in localStorage for session management
      localStorage.setItem('gi_yatra_token', token);
      localStorage.setItem('gi_yatra_user', JSON.stringify(userWithoutPassword));
      
      return {
        success: true,
        user: userWithoutPassword,
        token: token
      };
    }
    
    return {
      success: false,
      message: 'Invalid credentials'
    };
  },

  // Logout function
  logout: async () => {
    await simulateDelay(500);
    localStorage.removeItem('gi_yatra_token');
    localStorage.removeItem('gi_yatra_user');
    return { success: true };
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem('gi_yatra_user');
    const token = localStorage.getItem('gi_yatra_token');
    
    if (user && token) {
      return {
        user: JSON.parse(user),
        token: token,
        isAuthenticated: true
      };
    }
    
    return {
      user: null,
      token: null,
      isAuthenticated: false
    };
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('gi_yatra_token');
  }
};

// GI Applications Service
export const giApplicationService = {
  // Submit new GI application
  submitApplication: async (applicationData) => {
    await simulateDelay(2000);
    
    const newApplication = {
      id: `GI${String(mockGIApplications.length + 1).padStart(3, '0')}`,
      ...applicationData,
      status: 'submitted',
      submittedAt: new Date().toISOString(),
      reviewedBy: null,
      tradeCenterRemarks: 'Application received and under initial review',
      prosecutionHistory: []
    };
    
    mockGIApplications.push(newApplication);
    
    return {
      success: true,
      applicationId: newApplication.id,
      message: 'GI Application submitted successfully'
    };
  },

  // Get all applications (admin view)
  getAllApplications: async () => {
    await simulateDelay(1000);
    return {
      success: true,
      applications: mockGIApplications
    };
  },

  // Get applications by user (association view)
  getMyApplications: async (userEmail) => {
    await simulateDelay(800);
    const userApplications = mockGIApplications.filter(app => app.applicantEmail === userEmail);
    return {
      success: true,
      applications: userApplications
    };
  },

  // Update application status (admin function)
  updateApplicationStatus: async (applicationId, status, remarks) => {
    await simulateDelay(1500);
    
    const application = mockGIApplications.find(app => app.id === applicationId);
    if (application) {
      application.status = status;
      application.tradeCenterRemarks = remarks;
      application.reviewedBy = 'officer@giboard.gov.in';
      
      return {
        success: true,
        message: 'Application status updated successfully'
      };
    }
    
    return {
      success: false,
      message: 'Application not found'
    };
  }
};

// Non-GI Violations Service
export const violationService = {
  // Report new violation
  reportViolation: async (violationData) => {
    await simulateDelay(1800);
    
    const newViolation = {
      id: `NONGI${String(mockViolations.length + 1).padStart(3, '0')}`,
      ...violationData,
      status: 'reported',
      reportedAt: new Date().toISOString(),
      actionTaken: 'Violation reported and assigned for investigation',
      associationNotified: true,
      prosecutionStatus: 'pending'
    };
    
    mockViolations.push(newViolation);
    
    return {
      success: true,
      violationId: newViolation.id,
      message: 'Non-GI product violation reported successfully'
    };
  },

  // Get all violations (admin view)
  getAllViolations: async () => {
    await simulateDelay(900);
    return {
      success: true,
      violations: mockViolations
    };
  },

  // Get violations by reporter
  getMyViolations: async (userEmail) => {
    await simulateDelay(700);
    const userViolations = mockViolations.filter(v => v.reportedBy === userEmail);
    return {
      success: true,
      violations: userViolations
    };
  },

  // Initiate prosecution
  initiateProsecution: async (violationId, prosecutionDetails) => {
    await simulateDelay(2000);
    
    const violation = mockViolations.find(v => v.id === violationId);
    if (violation) {
      violation.status = 'prosecution_initiated';
      violation.prosecutionStatus = 'legal_notice_sent';
      violation.actionTaken = `Legal proceedings initiated: ${prosecutionDetails}`;
      
      return {
        success: true,
        message: 'Prosecution proceedings initiated successfully'
      };
    }
    
    return {
      success: false,
      message: 'Violation record not found'
    };
  }
};

// User Management Service
export const userService = {
  // Get all users (admin function)
  getAllUsers: async () => {
    await simulateDelay(800);
    return {
      success: true,
      users: mockUsers.map(({ password, ...user }) => user)
    };
  },

  // Create new user
  createUser: async (userData) => {
    await simulateDelay(1500);
    
    const newUser = {
      id: mockUsers.length + 1,
      ...userData,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    mockUsers.push(newUser);
    
    return {
      success: true,
      userId: newUser.id,
      message: 'User created successfully'
    };
  },

  // Update user status
  updateUserStatus: async (userId, status) => {
    await simulateDelay(1000);
    
    const user = mockUsers.find(u => u.id === userId);
    if (user) {
      user.status = status;
      return {
        success: true,
        message: 'User status updated successfully'
      };
    }
    
    return {
      success: false,
      message: 'User not found'
    };
  }
};

// Dashboard Service
export const dashboardService = {
  // Get dashboard statistics
  getStats: async () => {
    await simulateDelay(600);
    return {
      success: true,
      stats: mockDashboardStats
    };
  },

  // Get recent activities
  getRecentActivities: async () => {
    await simulateDelay(500);
    
    const activities = [
      {
        id: 1,
        type: 'gi_application',
        message: 'New GI application submitted for Udupi Mallige Premium',
        timestamp: '2024-10-03T10:30:00Z',
        user: 'Udupi GI Association'
      },
      {
        id: 2,
        type: 'violation_report',
        message: 'Non-GI violation reported for Fake Mysore Silk Sarees',
        timestamp: '2024-10-02T15:45:00Z',
        user: 'Mysore Silk Association'
      },
      {
        id: 3,
        type: 'prosecution',
        message: 'Prosecution initiated against QuickSilk Textiles Pvt Ltd',
        timestamp: '2024-10-01T09:20:00Z',
        user: 'GI Registration Officer'
      },
      {
        id: 4,
        type: 'approval',
        message: 'GI application approved for Channapatna Eco Toys',
        timestamp: '2024-09-30T14:10:00Z',
        user: 'System Administrator'
      }
    ];
    
    return {
      success: true,
      activities: activities
    };
  }
};

// File Upload Service (Mock)
export const fileService = {
  // Upload file (simulated)
  uploadFile: async (file) => {
    await simulateDelay(2000);
    
    // Simulate successful upload
    const mockFileName = `${Date.now()}_${file.name}`;
    
    return {
      success: true,
      fileName: mockFileName,
      fileUrl: `/uploads/${mockFileName}`,
      message: 'File uploaded successfully'
    };
  },

  // Upload multiple files
  uploadMultipleFiles: async (files) => {
    await simulateDelay(3000);
    
    const uploadedFiles = files.map(file => ({
      originalName: file.name,
      fileName: `${Date.now()}_${file.name}`,
      fileUrl: `/uploads/${Date.now()}_${file.name}`,
      size: file.size
    }));
    
    return {
      success: true,
      files: uploadedFiles,
      message: `${files.length} files uploaded successfully`
    };
  }
};

// Export all services
export default {
  authService,
  giApplicationService,
  violationService,
  userService,
  dashboardService,
  fileService
};