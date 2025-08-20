// api/admin/submissions.js - Admin Submissions Management
import jwt from 'jsonwebtoken';
import { getSubmissions, getSubmissionStats, validateAdminSession, updateSubmissionStatus } from '../../lib/kv.js';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, PUT, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, Cookie',
};

/**
 * Verify JWT token and extract session ID
 */
function verifyToken(token) {
  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET not configured');
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: 'kedi-labs-admin',
      audience: 'kedi-labs-admin'
    });
    
    return {
      isValid: true,
      sessionId: decoded.sessionId,
      userId: decoded.userId
    };
  } catch (error) {
    return {
      isValid: false,
      error: error.message
    };
  }
}

/**
 * Extract token from request headers or cookies
 */
function extractToken(req) {
  // Try Authorization header first
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Try cookie
  const cookies = req.headers.cookie;
  if (cookies) {
    const match = cookies.match(/admin_session=([^;]+)/);
    if (match) {
      return match[1];
    }
  }
  
  return null;
}

/**
 * Authenticate admin request
 */
async function authenticateAdmin(req) {
  const token = extractToken(req);
  
  if (!token) {
    return { isAuthenticated: false, error: 'No authentication token provided' };
  }
  
  const tokenResult = verifyToken(token);
  if (!tokenResult.isValid) {
    return { isAuthenticated: false, error: 'Invalid token' };
  }
  
  const isValidSession = await validateAdminSession(tokenResult.sessionId);
  if (!isValidSession) {
    return { isAuthenticated: false, error: 'Session expired' };
  }
  
  return {
    isAuthenticated: true,
    sessionId: tokenResult.sessionId,
    userId: tokenResult.userId
  };
}

/**
 * Get client IP address from request
 */
function getClientIP(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() || 
         req.headers['x-real-ip'] || 
         req.connection?.remoteAddress || 
         'unknown';
}

/**
 * Format submission for admin view
 */
function formatSubmission(submission) {
  return {
    id: submission.id,
    email: submission.email,
    stakeholderType: submission.stakeholderType,
    status: submission.status || 'new',
    timestamp: submission.timestamp,
    updatedAt: submission.updatedAt,
    formData: submission.formData,
    metadata: {
      ipAddress: submission.metadata?.ipAddress,
      userAgent: submission.metadata?.userAgent,
      source: submission.metadata?.source || 'website'
    }
  };
}

/**
 * Main handler function
 */
export default async function handler(req, res) {
  // Set CORS headers
  Object.entries(corsHeaders).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  try {
    const clientIP = getClientIP(req);
    
    // Authenticate admin
    const auth = await authenticateAdmin(req);
    if (!auth.isAuthenticated) {
      console.warn('Unauthorized admin access attempt:', {
        ip: clientIP,
        userAgent: req.headers['user-agent'],
        error: auth.error,
        timestamp: new Date().toISOString()
      });
      
      return res.status(401).json({
        error: 'Unauthorized',
        message: auth.error
      });
    }

    if (req.method === 'GET') {
      // Handle GET request - fetch submissions
      return await handleGetSubmissions(req, res, auth);
    } else if (req.method === 'PUT') {
      // Handle PUT request - update submission status
      return await handleUpdateSubmission(req, res, auth);
    } else {
      return res.status(405).json({
        error: 'Method not allowed',
        message: 'Only GET and PUT methods are supported'
      });
    }

  } catch (error) {
    console.error('Error in admin submissions API:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred',
      timestamp: new Date().toISOString()
    });
  }
}

/**
 * Handle GET submissions request
 */
async function handleGetSubmissions(req, res, auth) {
  try {
    const {
      page = '1',
      limit = '20',
      status,
      stakeholderType,
      includeStats = 'true'
    } = req.query;

    // Parse and validate pagination parameters
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));

    // Get submissions with pagination
    const result = await getSubmissions(pageNum, limitNum, status);
    
    // Filter by stakeholder type if specified
    let filteredSubmissions = result.submissions;
    if (stakeholderType && stakeholderType !== 'all') {
      filteredSubmissions = result.submissions.filter(
        sub => sub.stakeholderType === stakeholderType
      );
    }

    // Format submissions for admin view
    const formattedSubmissions = filteredSubmissions.map(formatSubmission);

    // Get statistics if requested
    let statistics = null;
    if (includeStats === 'true') {
      statistics = await getSubmissionStats();
    }

    // Log admin access
    console.log('Admin accessed submissions:', {
      userId: auth.userId,
      sessionId: auth.sessionId,
      page: pageNum,
      limit: limitNum,
      status,
      stakeholderType,
      resultCount: formattedSubmissions.length,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      data: {
        submissions: formattedSubmissions,
        pagination: {
          ...result.pagination,
          page: pageNum,
          limit: limitNum
        },
        filters: {
          status: status || 'all',
          stakeholderType: stakeholderType || 'all'
        },
        statistics
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    throw error;
  }
}

/**
 * Handle PUT submission update request
 */
async function handleUpdateSubmission(req, res, auth) {
  try {
    const { submissionId, status } = req.body;

    if (!submissionId || !status) {
      return res.status(400).json({
        error: 'Invalid request',
        message: 'Both submissionId and status are required'
      });
    }

    // Validate status value
    const validStatuses = ['new', 'read', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        error: 'Invalid status',
        message: 'Status must be one of: ' + validStatuses.join(', ')
      });
    }

    // Update submission status
    const updated = await updateSubmissionStatus(submissionId, status);
    
    if (!updated) {
      return res.status(404).json({
        error: 'Submission not found',
        message: 'The specified submission could not be found or updated'
      });
    }

    // Log admin action
    console.log('Admin updated submission status:', {
      userId: auth.userId,
      sessionId: auth.sessionId,
      submissionId,
      newStatus: status,
      timestamp: new Date().toISOString()
    });

    return res.status(200).json({
      success: true,
      message: 'Submission status updated successfully',
      data: {
        submissionId,
        status,
        updatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error updating submission:', error);
    throw error;
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}