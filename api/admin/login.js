// api/admin/login.js - Admin Authentication Endpoint
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { checkRateLimit, storeAdminSession } from '../../lib/kv.js';

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
 * Generate secure session token
 */
function generateSessionToken() {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Hash password for comparison
 */
function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
}

/**
 * Create JWT token
 */
function createJWTToken(sessionId) {
  return jwt.sign(
    { 
      sessionId,
      userId: 'admin',
      type: 'admin',
      iat: Math.floor(Date.now() / 1000)
    },
    process.env.JWT_SECRET,
    { 
      expiresIn: '24h',
      issuer: 'kedi-labs-admin',
      audience: 'kedi-labs-admin'
    }
  );
}

/**
 * Validate password strength
 */
function isValidPassword(password) {
  if (!password || typeof password !== 'string') return false;
  
  // Must be at least 8 characters
  if (password.length < 8) return false;
  
  // Must contain at least one uppercase, lowercase, number, and special char
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  return hasUpper && hasLower && hasNumber && hasSpecial;
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
    
    // Strict rate limiting for admin login (5 attempts per hour per IP)
    const rateLimit = await checkRateLimit(
      `admin_login:${clientIP}`, 
      60 * 60 * 1000, // 1 hour
      5 // max 5 attempts per hour
    );

    if (!rateLimit.allowed) {
      // Log suspicious activity
      console.warn('Admin login rate limit exceeded:', {
        ip: clientIP,
        userAgent,
        timestamp: new Date().toISOString()
      });
      
      res.setHeader('X-RateLimit-Limit', '5');
      res.setHeader('X-RateLimit-Remaining', rateLimit.remaining);
      res.setHeader('X-RateLimit-Reset', new Date(rateLimit.resetTime).toISOString());
      
      return res.status(429).json({
        error: 'Too many login attempts',
        message: 'Rate limit exceeded. Please try again in 1 hour.',
        resetTime: rateLimit.resetTime
      });
    }

    // Add rate limit headers
    res.setHeader('X-RateLimit-Limit', '5');
    res.setHeader('X-RateLimit-Remaining', rateLimit.remaining);
    res.setHeader('X-RateLimit-Reset', new Date(rateLimit.resetTime).toISOString());

    // Validate request body
    const { password } = req.body || {};
    
    if (!password || typeof password !== 'string') {
      return res.status(400).json({
        error: 'Invalid credentials',
        message: 'Password is required'
      });
    }

    // Check environment variables
    if (!process.env.ADMIN_PASSWORD_HASH) {
      console.error('ADMIN_PASSWORD_HASH environment variable not set');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Admin authentication not properly configured'
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error('JWT_SECRET environment variable not set');
      return res.status(500).json({
        error: 'Server configuration error',
        message: 'Authentication system not properly configured'
      });
    }

    // Verify password
    const passwordHash = hashPassword(password);
    const isValidAuth = passwordHash === process.env.ADMIN_PASSWORD_HASH;
    
    if (!isValidAuth) {
      // Log failed login attempt
      console.warn('Failed admin login attempt:', {
        ip: clientIP,
        userAgent,
        timestamp: new Date().toISOString()
      });
      
      return res.status(401).json({
        error: 'Invalid credentials',
        message: 'Incorrect password'
      });
    }

    // Generate session
    const sessionId = generateSessionToken();
    const sessionStored = await storeAdminSession(sessionId, 24); // 24 hours
    
    if (!sessionStored) {
      console.error('Failed to store admin session');
      return res.status(500).json({
        error: 'Authentication error',
        message: 'Failed to create session'
      });
    }

    // Create JWT token
    const token = createJWTToken(sessionId);
    
    // Log successful login
    console.log('Successful admin login:', {
      ip: clientIP,
      userAgent,
      sessionId,
      timestamp: new Date().toISOString()
    });

    // Return success response with secure cookie
    res.setHeader('Set-Cookie', [
      `admin_session=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=86400`,
      `admin_logged_in=true; Secure; SameSite=Strict; Path=/; Max-Age=86400`
    ]);

    return res.status(200).json({
      success: true,
      message: 'Authentication successful',
      token,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      sessionInfo: {
        sessionId,
        userId: 'admin',
        loginTime: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Error in admin login:', error);
    
    return res.status(500).json({
      error: 'Internal server error',
      message: 'An unexpected error occurred during authentication',
      timestamp: new Date().toISOString()
    });
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}