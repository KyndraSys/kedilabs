// lib/email.js - Email Service Utilities using Resend
import { Resend } from 'resend';

// Initialize Resend client
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Email templates for different stakeholder types
 */
const STAKEHOLDER_TEMPLATES = {
  startup_founder: {
    subject: 'New Startup Founder Inquiry - Kedi Labs',
    adminSubject: 'New Startup Founder Contact - Kedi Labs',
    userSubject: 'Thank you for reaching out to Kedi Labs'
  },
  researcher: {
    subject: 'New Research Collaboration Inquiry - Kedi Labs',
    adminSubject: 'New Research Collaboration - Kedi Labs',
    userSubject: 'Thank you for your research inquiry - Kedi Labs'
  },
  investor: {
    subject: 'New Investor Inquiry - Kedi Labs',
    adminSubject: 'New Investment Inquiry - Kedi Labs',
    userSubject: 'Thank you for your investment interest - Kedi Labs'
  },
  mentor: {
    subject: 'New Mentor Application - Kedi Labs',
    adminSubject: 'New Mentor Application - Kedi Labs',
    userSubject: 'Thank you for your mentorship application - Kedi Labs'
  },
  student: {
    subject: 'New Student Inquiry - Kedi Labs',
    adminSubject: 'New Student Program Inquiry - Kedi Labs',
    userSubject: 'Thank you for your interest in our programs - Kedi Labs'
  },
  partner: {
    subject: 'New Partnership Inquiry - Kedi Labs',
    adminSubject: 'New Partnership Opportunity - Kedi Labs',
    userSubject: 'Thank you for your partnership interest - Kedi Labs'
  }
};

/**
 * Create admin notification email template
 * @param {Object} submission - Submission data
 * @returns {string} - HTML email template
 */
function createAdminEmailTemplate(submission) {
  const { stakeholderType, email, formData, timestamp, id } = submission;
  const template = STAKEHOLDER_TEMPLATES[stakeholderType] || STAKEHOLDER_TEMPLATES.partner;
  
  let formFields = '';
  Object.entries(formData).forEach(([key, value]) => {
    if (value && key !== 'email') {
      const fieldName = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
      formFields += `
        <tr>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; background-color: #f9fafb;">
            ${fieldName}:
          </td>
          <td style="padding: 8px 12px; border-bottom: 1px solid #e5e7eb; color: #4b5563;">
            ${Array.isArray(value) ? value.join(', ') : value}
          </td>
        </tr>
      `;
    }
  });

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${template.adminSubject}</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">New ${stakeholderType.replace('_', ' ').toUpperCase()} Inquiry</h1>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <div style="margin-bottom: 25px; padding: 15px; background-color: #f0f9ff; border-left: 4px solid #3b82f6; border-radius: 5px;">
          <p style="margin: 0; color: #1e40af; font-weight: 600;">📧 Contact: ${email}</p>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Submission ID: ${id}</p>
          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 14px;">Date: ${new Date(timestamp).toLocaleString()}</p>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          ${formFields}
        </table>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f8fafc; border-radius: 5px; text-align: center;">
          <p style="margin: 0; color: #64748b; font-size: 14px;">
            View all submissions in your 
            <a href="${process.env.SITE_URL}/admin" style="color: #3b82f6; text-decoration: none; font-weight: 600;">Admin Dashboard</a>
          </p>
        </div>
      </div>
      
      <div style="margin-top: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
        <p>© 2024 Kedi Labs. All rights reserved.</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Create user acknowledgment email template
 * @param {Object} submission - Submission data
 * @returns {string} - HTML email template
 */
function createUserEmailTemplate(submission) {
  const { stakeholderType, email, formData } = submission;
  const template = STAKEHOLDER_TEMPLATES[stakeholderType] || STAKEHOLDER_TEMPLATES.partner;
  const name = formData.firstName || formData.contactName || formData.name || email.split('@')[0];
  
  const stakeholderMessages = {
    startup_founder: {
      message: "Thank you for reaching out about your startup! Our team will review your inquiry and get back to you within 2-3 business days with information about how Kedi Labs can support your innovation journey.",
      nextSteps: "We'll be in touch soon to discuss potential collaboration opportunities, funding options, and how our technology incubator can help accelerate your startup's growth."
    },
    researcher: {
      message: "Thank you for your interest in research collaboration! We're excited to learn about your research focus and explore potential partnerships.",
      nextSteps: "Our research team will review your inquiry and contact you within 2-3 business days to discuss collaboration opportunities and resource sharing."
    },
    investor: {
      message: "Thank you for your investment interest in Kedi Labs! We appreciate your confidence in our mission to drive technological innovation.",
      nextSteps: "Our business development team will reach out within 1-2 business days to schedule a meeting and share detailed information about our current investment opportunities."
    },
    mentor: {
      message: "Thank you for your interest in becoming a mentor! Your expertise would be invaluable to our community of innovators and entrepreneurs.",
      nextSteps: "Our program coordinator will contact you within 2-3 business days to discuss mentorship opportunities and how you can contribute to our ecosystem."
    },
    student: {
      message: "Thank you for your interest in our programs! We're excited to help you develop your skills and advance your career in technology.",
      nextSteps: "Our admissions team will review your application and contact you within 3-5 business days with information about available programs and next steps."
    },
    partner: {
      message: "Thank you for your interest in partnering with Kedi Labs! We're always looking for strategic partnerships that align with our mission.",
      nextSteps: "Our partnerships team will review your proposal and get back to you within 2-3 business days to discuss potential collaboration opportunities."
    }
  };

  const content = stakeholderMessages[stakeholderType] || stakeholderMessages.partner;

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${template.userSubject}</title>
    </head>
    <body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 24px;">Thank You for Contacting Kedi Labs</h1>
      </div>
      
      <div style="background: white; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 10px 10px;">
        <p style="font-size: 18px; color: #1f2937; margin-bottom: 20px;">Hello ${name},</p>
        
        <p style="color: #4b5563; margin-bottom: 20px;">
          ${content.message}
        </p>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; border-left: 4px solid #3b82f6; margin: 25px 0;">
          <h3 style="color: #1e40af; margin: 0 0 10px 0; font-size: 16px;">📋 Next Steps:</h3>
          <p style="color: #1e40af; margin: 0; font-size: 14px;">
            ${content.nextSteps}
          </p>
        </div>
        
        <div style="margin: 25px 0; padding: 20px; background-color: #f8fafc; border-radius: 8px;">
          <h3 style="color: #374151; margin: 0 0 15px 0; font-size: 16px;">🚀 While you wait, explore:</h3>
          <ul style="color: #4b5563; margin: 0; padding-left: 20px;">
            <li><a href="${process.env.SITE_URL}/programs" style="color: #3b82f6; text-decoration: none;">Our Programs</a> - Discover our technology incubation and training programs</li>
            <li><a href="${process.env.SITE_URL}/about" style="color: #3b82f6; text-decoration: none;">About Kedi Labs</a> - Learn more about our mission and impact</li>
            <li><a href="${process.env.SITE_URL}/blog" style="color: #3b82f6; text-decoration: none;">Latest News</a> - Stay updated with our latest innovations and partnerships</li>
          </ul>
        </div>
        
        <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 8px; text-align: center;">
          <p style="margin: 0 0 10px 0; color: #374151; font-weight: 600;">Questions or urgent matters?</p>
          <p style="margin: 0; color: #6b7280; font-size: 14px;">
            Contact us directly at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #3b82f6; text-decoration: none;">${process.env.ADMIN_EMAIL}</a>
          </p>
        </div>
      </div>
      
      <div style="margin-top: 20px; text-align: center; color: #9ca3af; font-size: 12px;">
        <p>© 2024 Kedi Labs. All rights reserved.</p>
        <p>Empowering Innovation Through Technology</p>
      </div>
    </body>
    </html>
  `;
}

/**
 * Send email notifications for new submission
 * @param {Object} submission - Submission data
 * @returns {Promise<Object>} - Email sending results
 */
export async function sendSubmissionNotifications(submission) {
  const results = {
    adminEmail: { success: false, error: null },
    userEmail: { success: false, error: null }
  };

  try {
    const template = STAKEHOLDER_TEMPLATES[submission.stakeholderType] || STAKEHOLDER_TEMPLATES.partner;
    
    // Send admin notification
    try {
      const adminEmailResult = await resend.emails.send({
        from: `Kedi Labs <${process.env.FROM_EMAIL}>`,
        to: [process.env.ADMIN_EMAIL],
        subject: template.adminSubject,
        html: createAdminEmailTemplate(submission),
        tags: [
          { name: 'category', value: 'admin-notification' },
          { name: 'stakeholder-type', value: submission.stakeholderType },
          { name: 'submission-id', value: submission.id }
        ]
      });
      
      results.adminEmail.success = true;
      results.adminEmail.messageId = adminEmailResult.data?.id;
    } catch (error) {
      console.error('Failed to send admin email:', error);
      results.adminEmail.error = error.message;
    }

    // Send user acknowledgment
    try {
      const userEmailResult = await resend.emails.send({
        from: `Kedi Labs <${process.env.FROM_EMAIL}>`,
        to: [submission.email],
        subject: template.userSubject,
        html: createUserEmailTemplate(submission),
        tags: [
          { name: 'category', value: 'user-acknowledgment' },
          { name: 'stakeholder-type', value: submission.stakeholderType },
          { name: 'submission-id', value: submission.id }
        ]
      });
      
      results.userEmail.success = true;
      results.userEmail.messageId = userEmailResult.data?.id;
    } catch (error) {
      console.error('Failed to send user email:', error);
      results.userEmail.error = error.message;
    }

    return results;
  } catch (error) {
    console.error('Error in sendSubmissionNotifications:', error);
    return results;
  }
}

/**
 * Send test email to verify configuration
 * @param {string} testEmail - Email to send test to
 * @returns {Promise<boolean>} - Success status
 */
export async function sendTestEmail(testEmail) {
  try {
    const result = await resend.emails.send({
      from: `Kedi Labs <${process.env.FROM_EMAIL}>`,
      to: [testEmail],
      subject: 'Kedi Labs - Email Configuration Test',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333;">Email Configuration Test ✅</h2>
          <p>Congratulations! Your Kedi Labs email configuration is working correctly.</p>
          <p><strong>Test sent at:</strong> ${new Date().toISOString()}</p>
          <p>You can now safely deploy your contact form system.</p>
        </div>
      `,
      tags: [
        { name: 'category', value: 'configuration-test' }
      ]
    });
    
    return true;
  } catch (error) {
    console.error('Failed to send test email:', error);
    return false;
  }
}

/**
 * Validate email configuration
 * @returns {Promise<Object>} - Configuration status
 */
export async function validateEmailConfig() {
  const issues = [];
  
  if (!process.env.RESEND_API_KEY) {
    issues.push('RESEND_API_KEY is not set');
  }
  
  if (!process.env.FROM_EMAIL) {
    issues.push('FROM_EMAIL is not set');
  }
  
  if (!process.env.ADMIN_EMAIL) {
    issues.push('ADMIN_EMAIL is not set');
  }
  
  if (!process.env.SITE_URL) {
    issues.push('SITE_URL is not set');
  }

  return {
    isValid: issues.length === 0,
    issues
  };
}