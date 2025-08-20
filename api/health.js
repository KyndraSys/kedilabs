// api/health.js - System Health Check Endpoint
import { kv } from '@vercel/kv';
import { validateEmailConfig } from '../lib/email.js';

/**
 * Health check endpoint for monitoring system status
 */
export default async function handler(req, res) {
  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({
      error: 'Method not allowed',
      message: 'Only GET requests are supported'
    });
  }

  const startTime = Date.now();
  const healthCheck = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    checks: {}
  };

  try {
    // Check KV Database connectivity
    try {
      await kv.ping();
      healthCheck.checks.database = {
        status: 'healthy',
        message: 'KV database connection successful',
        responseTime: Date.now() - startTime
      };
    } catch (error) {
      healthCheck.checks.database = {
        status: 'unhealthy',
        message: 'KV database connection failed',
        error: error.message,
        responseTime: Date.now() - startTime
      };
      healthCheck.status = 'degraded';
    }

    // Check Email service configuration
    try {
      const emailConfig = await validateEmailConfig();
      healthCheck.checks.email = {
        status: emailConfig.isValid ? 'healthy' : 'unhealthy',
        message: emailConfig.isValid ? 'Email configuration valid' : 'Email configuration issues',
        issues: emailConfig.issues || []
      };
      
      if (!emailConfig.isValid) {
        healthCheck.status = 'degraded';
      }
    } catch (error) {
      healthCheck.checks.email = {
        status: 'unhealthy',
        message: 'Email configuration check failed',
        error: error.message
      };
      healthCheck.status = 'degraded';
    }

    // Check environment variables
    const requiredEnvVars = [
      'RESEND_API_KEY',
      'KV_REST_API_URL',
      'KV_REST_API_TOKEN',
      'ADMIN_PASSWORD_HASH',
      'JWT_SECRET',
      'SITE_URL',
      'ADMIN_EMAIL',
      'FROM_EMAIL'
    ];

    const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);
    
    healthCheck.checks.environment = {
      status: missingEnvVars.length === 0 ? 'healthy' : 'unhealthy',
      message: missingEnvVars.length === 0 
        ? 'All required environment variables present'
        : `Missing environment variables: ${missingEnvVars.join(', ')}`,
      missingVariables: missingEnvVars
    };

    if (missingEnvVars.length > 0) {
      healthCheck.status = 'unhealthy';
    }

    // Get system statistics (if database is healthy)
    if (healthCheck.checks.database.status === 'healthy') {
      try {
        const stats = {
          totalSubmissions: await kv.get('stats:total') || 0,
          todaySubmissions: await kv.get(`stats:daily:${new Date().toISOString().split('T')[0]}`) || 0
        };
        
        healthCheck.checks.statistics = {
          status: 'healthy',
          data: stats
        };
      } catch (error) {
        healthCheck.checks.statistics = {
          status: 'warning',
          message: 'Could not retrieve statistics',
          error: error.message
        };
      }
    }

    // Calculate total response time
    const totalResponseTime = Date.now() - startTime;
    healthCheck.responseTime = `${totalResponseTime}ms`;

    // Set appropriate HTTP status code
    const httpStatus = healthCheck.status === 'healthy' ? 200 : 
                      healthCheck.status === 'degraded' ? 206 : 500;

    // Add cache headers
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    return res.status(httpStatus).json(healthCheck);

  } catch (error) {
    console.error('Health check failed:', error);
    
    return res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
      message: error.message,
      responseTime: `${Date.now() - startTime}ms`
    });
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
}