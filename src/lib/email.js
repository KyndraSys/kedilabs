
import emailjs from '@emailjs/browser';

const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '3Cu_Y-I5j71qwE0MJ';
const SERVICE_ID = 'kedilabs';
const TEMPLATE_ID = 'kedilabscontactform';
const ADMIN_EMAIL = 'contact@kedilabs.net';

export const sendContactEmail = async (formData, stakeholderType) => {
  try {
    emailjs.init(EMAILJS_PUBLIC_KEY);

    const toEmail = formData.email?.trim();
    if (!toEmail) {
      throw new Error('No recipient email provided');
    }

    const templateParams = {
      to_name: formData.name?.trim() || 'Kedi Labs Team',
      from_name: formData.name?.trim() || 'Anonymous',
      from_email: formData.email?.trim() || '',
      partner_type: stakeholderType || 'Unknown',
      subject: formData.subject?.trim() || 'New Submission',
      message: formData.message?.trim() || 'No message provided',
      reply_to: formData.email?.trim() || ADMIN_EMAIL,
      to_email: toEmail, // Form email as recipient
      cc_email: ADMIN_EMAIL, // Admin as CC
    };

    console.log('Sending email with params:', templateParams);

    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);

    console.log('Email sent:', response);

    return { status: 'success', message: 'Emails sent successfully' };
  } catch (error) {
    console.error('Error sending emails:', error, error.text);
    return { status: 'error', message: `Failed to send emails: ${error.text || error.message}` };
  }
};