// api/contact.js - Contact Form Submission Handler
import { storeSubmission, checkRateLimit } from '../lib/kv.js';
import { sendSubmissionNotifications } from '../lib/email.js';
import { validateSubmission } from '../lib/validation.js';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

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
 * Main handler function
 */
export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      message: 'This endpoint only accepts POST requests'
    });
  }

  try {
    const clientIP = getClientIP(req);
    const userAgent = req.headers['user-agent'] || 'unknown';
    
    // Rate limiting check
    const rateLimit = await checkRateLimit(
      clientIP, 
      15 * 60 * 1000, // 15 minutes
      5 // max 5 requests per 15 minutes per IP
    );

    if (!rateLimit.allowed) {
      res.setHeader('X-RateLimit-Limit', '5');
      res.setHeader('X-RateLimit-Remaining', rateLimit.remaining);
      res.setHeader('X-RateLimit-Reset', new Date(rateLimit.resetTime).toISOString());
      
      return res.status(429).json({
        error: 'Too many requests',
        message: 'Rate limit exceeded. Please try again later.',
        resetTime: rateLimit.resetTime
      });
    }

    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', '5');
    res.setHeader('X-RateLimit-Remaining', rateLimit.remaining);
    res.setHeader('X-RateLimit-Reset', new Date(rateLimit.resetTime).toISOString());

    // Parse and validate request body
    const rawSubmission = req.body;
    
    if (!rawSubmission || typeof rawSubmission !== 'object') {
      return res.status(400).json({
        error: 'Invalid request body',
        message: 'Request body must be a valid JSON object'
      });
    }

    // Validate submission data
    const validation = await validateSubmission(rawSubmission);
    if (!validation.isValid) {
      return res.status(400).json({
        error: 'Validation failed',
        message: 'Please check your form data',
        details: validation.errors
      });
    }

    // Prepare submission data
    const submissionData = {
      ...validation.data,
      metadata: {
        ipAddress: clientIP,
        userAgent,
        timestamp: new Date().toISOString(),
        source: 'website'
      }
    };

    // Store submission
    const submissionId = await storeSubmission(submissionData);
    
    // Send email notifications (don't wait for completion)
    sendSubmissionNotifications({
      id: submissionId,
      ...submissionData
    }).then(emailResults => {
      console.log('Email notifications sent:', {
        submissionId,
        adminEmail: emailResults.adminEmail.success,
        userEmail: emailResults.userEmail.success
      });
    }).catch(error => {
      console.error('Failed to send email notifications:', error);
    });

    // Return success response
    return res.status(200).json({
      success: true,
      message: 'Thank you for your submission! We will get back to you soon.',
      submissionId,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing contact form submission:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred. Please try again later.',
      timestamp: new Date().toISOString()
    });
  }
}

// Set CORS headers for all responses
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}