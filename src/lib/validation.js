// lib/validation.js - Server-side Validation Utilities
import { z } from 'zod';

// Email validation regex (more comprehensive)
const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Phone number validation regex (international format)
const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;

// URL validation regex
const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

// Base schema for all stakeholder types
const baseSchema = z.object({
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .regex(emailRegex, 'Please enter a valid email address')
    .max(255, 'Email is too long'),
  
  stakeholderType: z.enum([
    'startup_founder',
    'researcher', 
    'investor',
    'mentor',
    'student',
    'partner'
  ], { required_error: 'Please select a stakeholder type' }),
  
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message is too long (max 2000 characters)')
    .optional()
});

// Startup Founder specific fields
const startupFounderSchema = baseSchema.extend({
  companyName: z.string()
    .min(1, 'Company name is required')
    .max(100, 'Company name is too long'),
  
  founderName: z.string()
    .min(1, 'Founder name is required')
    .max(100, 'Founder name is too long'),
  
  industryFocus: z.enum([
    'healthcare',
    'fintech',
    'edtech',
    'agritech',
    'cleantech',
    'artificial_intelligence',
    'blockchain',
    'iot',
    'cybersecurity',
    'biotechnology',
    'other'
  ], { required_error: 'Please select an industry focus' }),
  
  fundingStage: z.enum([
    'idea_stage',
    'mvp_development',
    'pre_seed',
    'seed',
    'series_a',
    'series_b_plus'
  ], { required_error: 'Please select your funding stage' }),
  
  teamSize: z.enum([
    '1_person',
    '2_5_people',
    '6_10_people',
    '11_25_people',
    '26_plus_people'
  ], { required_error: 'Please select your team size' }),
  
  website: z.string()
    .regex(urlRegex, 'Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  
  phoneNumber: z.string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .optional()
    .or(z.literal(''))
});

// Researcher specific fields
const researcherSchema = baseSchema.extend({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(100, 'Name is too long'),
  
  institution: z.string()
    .min(1, 'Institution is required')
    .max(150, 'Institution name is too long'),
  
  researchArea: z.array(z.enum([
    'artificial_intelligence',
    'machine_learning',
    'data_science',
    'cybersecurity',
    'biotechnology',
    'renewable_energy',
    'quantum_computing',
    'robotics',
    'blockchain',
    'iot',
    'other'
  ])).min(1, 'Please select at least one research area'),
  
  academicLevel: z.enum([
    'undergraduate',
    'masters_student',
    'phd_student',
    'postdoc',
    'assistant_professor',
    'associate_professor',
    'professor',
    'industry_researcher'
  ], { required_error: 'Please select your academic level' }),
  
  collaborationType: z.enum([
    'joint_research',
    'resource_sharing',
    'student_exchange',
    'publication_collaboration',
    'grant_application',
    'other'
  ], { required_error: 'Please select collaboration type' }),
  
  website: z.string()
    .regex(urlRegex, 'Please enter a valid website or profile URL')
    .optional()
    .or(z.literal(''))
});

// Investor specific fields
const investorSchema = baseSchema.extend({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(100, 'Name is too long'),
  
  organization: z.string()
    .min(1, 'Organization is required')
    .max(150, 'Organization name is too long'),
  
  investorType: z.enum([
    'angel_investor',
    'venture_capital',
    'private_equity',
    'corporate_investor',
    'government_fund',
    'family_office',
    'other'
  ], { required_error: 'Please select investor type' }),
  
  investmentRange: z.enum([
    'under_50k',
    '50k_250k',
    '250k_1m',
    '1m_5m',
    '5m_20m',
    'above_20m'
  ], { required_error: 'Please select investment range' }),
  
  industryPreference: z.array(z.enum([
    'healthcare',
    'fintech',
    'edtech',
    'agritech',
    'cleantech',
    'artificial_intelligence',
    'blockchain',
    'iot',
    'cybersecurity',
    'biotechnology',
    'consumer_products',
    'enterprise_software',
    'other'
  ])).min(1, 'Please select at least one industry preference'),
  
  website: z.string()
    .regex(urlRegex, 'Please enter a valid website URL')
    .optional()
    .or(z.literal('')),
  
  phoneNumber: z.string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .optional()
    .or(z.literal(''))
});

// Mentor specific fields
const mentorSchema = baseSchema.extend({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(100, 'Name is too long'),
  
  currentRole: z.string()
    .min(1, 'Current role is required')
    .max(150, 'Role description is too long'),
  
  company: z.string()
    .min(1, 'Company is required')
    .max(150, 'Company name is too long'),
  
  experienceYears: z.enum([
    '1_3_years',
    '4_7_years',
    '8_15_years',
    '15_plus_years'
  ], { required_error: 'Please select your experience level' }),
  
  expertiseAreas: z.array(z.enum([
    'business_strategy',
    'product_development',
    'marketing_sales',
    'fundraising',
    'technology',
    'operations',
    'legal_compliance',
    'hr_recruitment',
    'international_expansion',
    'other'
  ])).min(1, 'Please select at least one expertise area'),
  
  mentorshipExperience: z.enum([
    'first_time',
    'some_experience',
    'experienced_mentor',
    'professional_mentor'
  ], { required_error: 'Please select your mentorship experience' }),
  
  availableTime: z.enum([
    '1_2_hours_month',
    '3_5_hours_month',
    '6_10_hours_month',
    '10_plus_hours_month'
  ], { required_error: 'Please select your available time commitment' }),
  
  linkedinProfile: z.string()
    .regex(urlRegex, 'Please enter a valid LinkedIn profile URL')
    .optional()
    .or(z.literal(''))
});

// Student specific fields
const studentSchema = baseSchema.extend({
  fullName: z.string()
    .min(1, 'Full name is required')
    .max(100, 'Name is too long'),
  
  institution: z.string()
    .min(1, 'Institution is required')
    .max(150, 'Institution name is too long'),
  
  studyLevel: z.enum([
    'high_school',
    'undergraduate',
    'masters',
    'phd',
    'postgraduate'
  ], { required_error: 'Please select your study level' }),
  
  fieldOfStudy: z.string()
    .min(1, 'Field of study is required')
    .max(100, 'Field of study is too long'),
  
  graduationYear: z.number()
    .min(2024, 'Graduation year must be 2024 or later')
    .max(2030, 'Graduation year seems too far in the future'),
  
  interestedPrograms: z.array(z.enum([
    'internship',
    'mentorship',
    'workshops',
    'hackathons',
    'research_projects',
    'startup_incubation',
    'skill_development',
    'networking_events'
  ])).min(1, 'Please select at least one program of interest'),
  
  skills: z.array(z.enum([
    'programming',
    'data_analysis',
    'web_development',
    'mobile_development',
    'machine_learning',
    'cybersecurity',
    'ui_ux_design',
    'project_management',
    'digital_marketing',
    'business_development',
    'other'
  ])).min(1, 'Please select at least one skill area'),
  
  portfolioWebsite: z.string()
    .regex(urlRegex, 'Please enter a valid portfolio URL')
    .optional()
    .or(z.literal(''))
});

// Partner specific fields
const partnerSchema = baseSchema.extend({
  organizationName: z.string()
    .min(1, 'Organization name is required')
    .max(150, 'Organization name is too long'),
  
  contactName: z.string()
    .min(1, 'Contact name is required')
    .max(100, 'Contact name is too long'),
  
  organizationType: z.enum([
    'corporation',
    'nonprofit',
    'government_agency',
    'educational_institution',
    'research_institution',
    'startup',
    'other'
  ], { required_error: 'Please select organization type' }),
  
  partnershipType: z.enum([
    'strategic_partnership',
    'technology_collaboration',
    'funding_partnership',
    'research_collaboration',
    'mentorship_program',
    'event_collaboration',
    'resource_sharing',
    'other'
  ], { required_error: 'Please select partnership type' }),
  
  industryFocus: z.array(z.enum([
    'healthcare',
    'fintech',
    'edtech',
    'agritech',
    'cleantech',
    'artificial_intelligence',
    'blockchain',
    'iot',
    'cybersecurity',
    'biotechnology',
    'consumer_products',
    'enterprise_software',
    'other'
  ])).min(1, 'Please select at least one industry focus'),
  
  organizationSize: z.enum([
    'startup_1_10',
    'small_11_50',
    'medium_51_200',
    'large_201_1000',
    'enterprise_1000_plus'
  ], { required_error: 'Please select organization size' }),
  
  website: z.string()
    .regex(urlRegex, 'Please enter a valid website URL')
    .min(1, 'Website is required'),
  
  phoneNumber: z.string()
    .regex(phoneRegex, 'Please enter a valid phone number')
    .optional()
    .or(z.literal(''))
});

// Schema mapping for different stakeholder types
const schemaMap = {
  startup_founder: startupFounderSchema,
  researcher: researcherSchema,
  investor: investorSchema,
  mentor: mentorSchema,
  student: studentSchema,
  partner: partnerSchema
};

/**
 * Sanitize string input by removing potentially harmful characters
 * @param {string} input - Input string to sanitize
 * @returns {string} - Sanitized string
 */
function sanitizeString(input) {
  if (typeof input !== 'string') return input;
  
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
}

/**
 * Recursively sanitize an object
 * @param {Object} obj - Object to sanitize
 * @returns {Object} - Sanitized object
 */
function sanitizeObject(obj) {
  if (Array.isArray(obj)) {
    return obj.map(sanitizeObject);
  }
  
  if (obj && typeof obj === 'object') {
    const sanitized = {};
    for (const [key, value] of Object.entries(obj)) {
      sanitized[key] = sanitizeObject(value);
    }
    return sanitized;
  }
  
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }
  
  return obj;
}

/**
 * Validate submission data based on stakeholder type
 * @param {Object} rawData - Raw submission data
 * @returns {Promise<Object>} - Validation result
 */
export async function validateSubmission(rawData) {
  try {
    // First sanitize the input data
    const sanitizedData = sanitizeObject(rawData);
    
    // Check if stakeholder type is provided
    if (!sanitizedData.stakeholderType) {
      return {
        isValid: false,
        errors: [{
          field: 'stakeholderType',
          message: 'Stakeholder type is required'
        }],
        data: null
      };
    }

    // Get the appropriate schema for the stakeholder type
    const schema = schemaMap[sanitizedData.stakeholderType];
    if (!schema) {
      return {
        isValid: false,
        errors: [{
          field: 'stakeholderType',
          message: 'Invalid stakeholder type'
        }],
        data: null
      };
    }

    // Validate the data against the schema
    const result = schema.safeParse(sanitizedData);
    
    if (result.success) {
      return {
        isValid: true,
        errors: [],
        data: {
          email: result.data.email,
          stakeholderType: result.data.stakeholderType,
          formData: { ...result.data }
        }
      };
    } else {
      // Transform Zod errors into a more user-friendly format
      const errors = result.error.errors.map(error => ({
        field: error.path.join('.'),
        message: error.message,
        code: error.code
      }));
      
      return {
        isValid: false,
        errors,
        data: null
      };
    }
  } catch (error) {
    console.error('Validation error:', error);
    return {
      isValid: false,
      errors: [{
        field: 'general',
        message: 'An error occurred during validation'
      }],
      data: null
    };
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export function isValidEmail(email) {
  return typeof email === 'string' && emailRegex.test(email);
}

/**
 * Validate phone number format
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Is valid phone number
 */
export function isValidPhone(phone) {
  return typeof phone === 'string' && phoneRegex.test(phone);
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - Is valid URL
 */
export function isValidURL(url) {
  return typeof url === 'string' && urlRegex.test(url);
}

/**
 * Get validation rules for a specific stakeholder type
 * @param {string} stakeholderType - The stakeholder type
 * @returns {Object} - Validation rules and field information
 */
export function getValidationRules(stakeholderType) {
  const schema = schemaMap[stakeholderType];
  if (!schema) {
    return null;
  }

  // Extract field requirements from the schema
  const rules = {};
  const shape = schema.shape;
  
  for (const [fieldName, fieldSchema] of Object.entries(shape)) {
    rules[fieldName] = {
      required: !fieldSchema.isOptional(),
      type: fieldSchema._def.typeName,
      description: fieldSchema.description || null
    };
  }
  
  return {
    stakeholderType,
    fields: rules,
    requiredFields: Object.keys(rules).filter(field => rules[field].required)
  };
}

/**
 * Get all available stakeholder types with descriptions
 * @returns {Array} - Array of stakeholder type objects
 */
export function getStakeholderTypes() {
  return [
    {
      value: 'startup_founder',
      label: 'Startup Founder',
      description: 'Entrepreneurs looking for incubation, funding, or mentorship support'
    },
    {
      value: 'researcher',
      label: 'Researcher',
      description: 'Academic or industry researchers interested in collaboration'
    },
    {
      value: 'investor',
      label: 'Investor',
      description: 'Angel investors, VCs, or other funding sources'
    },
    {
      value: 'mentor',
      label: 'Mentor',
      description: 'Industry experts willing to provide guidance and mentorship'
    },
    {
      value: 'student',
      label: 'Student',
      description: 'Students interested in programs, internships, or skill development'
    },
    {
      value: 'partner',
      label: 'Partner',
      description: 'Organizations interested in strategic partnerships or collaborations'
    }
  ];
}