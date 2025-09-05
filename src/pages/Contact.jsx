import React, { useState, useEffect } from 'react';
import { ChevronRight, Phone, Mail, MapPin, Building2, ArrowRight, Send, CheckCircle, AlertCircle, Loader2, Globe, Clock, MessageSquare, HandHeart, Calendar, Coins } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { sendContactEmail } from '../lib/email';

const Seo = ({ title, description, canonical, schemaMarkup }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      {schemaMarkup && (
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      )}
    </Helmet>
  );
};

const KediLabsContact = () => {
  const [activeForm, setActiveForm] = useState('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    message: '',
    subject: '',
    interests: '',
    interestsOther: '',
    availability: '',
    experience: '',
    fundingAmount: '',
    investmentType: '',
    investmentTypeOther: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Function to handle navigation with cache busting
  const handleNavigate = (url) => {
    const cacheBustUrl = `${url}?t=${Date.now()}`; // Add timestamp to bust cache
    window.location.href = cacheBustUrl; // Force full page reload
  };

  // Ensure correct title on page load
  useEffect(() => {
    document.title = "Contact Kedi Labs - STEM Education & Careers in Kenya";
  }, []);

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form-section');
    if (formSection) {
      formSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const stakeholderTypes = [
    { 
      id: 'contact', 
      label: 'Just Connect', 
      icon: Building2, 
      description: 'Collaborate with Kedi Labs to advance STEM education in Kenya through digital learning',
      fields: ['name', 'email', 'phone', 'organization', 'subject', 'message']
    },
    { 
      id: 'volunteer', 
      label: 'Volunteer', 
      icon: HandHeart, 
      description: 'Join African educators to empower women in STEM and shape career pathways',
      fields: ['name', 'email', 'phone', 'organization', 'subject', 'interests', 'availability', 'experience', 'message']
    },
    { 
      id: 'events', 
      label: 'Join Our Events', 
      icon: Calendar, 
      description: 'Participate in events to explore STEM careers and sustainable technology training',
      fields: ['name', 'email', 'phone', 'organization', 'subject', 'interests', 'message']
    },
    { 
      id: 'funding', 
      label: 'Funding/Investor', 
      icon: Coins, 
      description: 'Support digital STEM education in Kenya’s national schools for sustainable impact',
      fields: ['name', 'email', 'phone', 'organization', 'subject', 'fundingAmount', 'investmentType', 'message']
    }
  ];

  const contactInfo = [
    {
      type: 'Office',
      icon: MapPin,
      title: 'Headquarters',
      details: 'Kedi Labs Innovation Hub\nKisumu, Kenya',
      link: 'https://maps.google.com/?q=Kisumu'
    },
    {
      type: 'General',
      icon: Mail,
      title: 'General Inquiries',
      details: 'contact@kedilabs.net',
      link: 'mailto:contact@kedilabs.net'
    },
    {
      type: 'Support',
      icon: MessageSquare,
      title: 'Technical Support',
      details: 'contact@kedilabs.net',
      link: 'mailto:contact@kedilabs.net'
    },
    {
      type: 'Partnerships',
      icon: Building2,
      title: 'Partnerships',
      details: 'contact@kedilabs.net',
      link: 'mailto:contact@kedilabs.net'
    }
  ];

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleFormTypeChange = (typeId) => {
    console.log('Switching to form:', typeId);
    setActiveForm(typeId);
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      message: '',
      subject: '',
      interests: '',
      interestsOther: '',
      availability: '',
      experience: '',
      fundingAmount: '',
      investmentType: '',
      investmentTypeOther: ''
    });
    setSubmitStatus(null);
    setErrorMessage(null);
  };

  const validateForm = () => {
    const currentStakeholder = stakeholderTypes.find(type => type.id === activeForm);
    const requiredFields = ['name', 'email', 'subject', 'message'].filter(field => 
      currentStakeholder?.fields.includes(field)
    );
    if (currentStakeholder?.fields.includes('interests')) {
      requiredFields.push('interests');
    }
    return requiredFields.every(field => formData[field].trim() !== '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setSubmitStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorMessage(null);

    try {
      const result = await sendContactEmail(formData, activeForm);
      setSubmitStatus(result.status);
      if (result.status === 'error') {
        setErrorMessage(result.message);
      }

      if (result.status === 'success') {
        setFormData({
          name: '',
          email: '',
          phone: '',
          organization: '',
          message: '',
          subject: '',
          interests: '',
          interestsOther: '',
          availability: '',
          experience: '',
          fundingAmount: '',
          investmentType: '',
          investmentTypeOther: ''
        });
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error.message || 'An unexpected error occurred. Please try again later.');
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getCurrentStakeholder = () => {
    return stakeholderTypes.find(type => type.id === activeForm);
  };

  const shouldShowField = (fieldName) => {
    const currentStakeholder = getCurrentStakeholder();
    return currentStakeholder?.fields.includes(fieldName);
  };

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kedi Labs - Kenya Digital Laboratories",
    "alternateName": "Kenya Digital Labs",
    "url": "https://kedilabs.net/contact",
    "description": "Contact Kedi Labs to advance STEM education in Kenya through digital learning, empower women in STEM, explore career pathways, and partner with national schools for sustainable technology training.",
    "foundingLocation": {
      "@type": "Place",
      "name": "Kisumu, Kenya"
    },
    "areaServed": "Kenya",
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "contactType": "General Inquiries",
        "email": "contact@kedilabs.net",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "Technical Support",
        "email": "contact@kedilabs.net",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "Partnerships",
        "email": "contact@kedilabs.net",
        "availableLanguage": ["English"]
      },
      {
        "@type": "ContactPoint",
        "contactType": "Office",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Kisumu",
          "addressCountry": "KE"
        },
        "availableLanguage": ["English"]
      }
    ],
    "keywords": "STEM education Kenya, digital learning Africa, sustainable technology training, women in STEM, STEM careers Kenya, STEM subject combination, national schools Kenya, STEM education partnerships"
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Seo 
        title="Contact Kedi Labs - STEM Education & Careers in Kenya"
        description="Contact Kedi Labs to advance STEM education in Kenya through digital learning, empower women in STEM, explore career pathways, and partner with national schools for sustainable technology training."
        canonical="https://kedilabs.net/contact"
        schemaMarkup={schemaMarkup}
      />
      {/* Meta tags to prevent caching */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-slate-900/90 z-10"></div>
          <div className="absolute inset-0">
            <img
              src="https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0Ij7TX4xPNXvOz2igs09lThn4DFJjwZtB8ufL"
              alt="Contact Kedi Labs for STEM Education in Kenya"
              className="w-full h-full object-cover opacity-60"
            />
          </div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-64 h-64 border border-cyan-400 rotate-45 rounded-2xl"></div>
            <div className="absolute bottom-32 left-32 w-48 h-48 border border-teal-400 rotate-12 rounded-xl"></div>
          </div>
        </div>
        <div className="relative z-20 pt-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center text-sm text-slate-400">
              <button 
                onClick={() => handleNavigate('/')}
                className="hover:text-cyan-400 transition-colors"
              >
                Home
              </button>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-cyan-400 font-medium">Contact</span>
            </div>
          </div>
        </div>
        <div className="relative z-20 flex items-center min-h-[50vh]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl">
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6 leading-tight">
                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-400 font-normal">Touch</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-3xl">
                Join Kedi Labs to transform STEM education in Kenya. Connect to empower women in STEM, explore sustainable career pathways, or partner with national schools for digital learning.
              </p>
              <button
                onClick={scrollToForm}
                className="group bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-white/20 hover:border-white/30 mt-4"
              >
                Start Your STEM Journey
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* STEM Careers and Women in STEM Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-800 mb-4">
              Transforming <span className="text-green-600 font-semibold">STEM Education in Kenya</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Kedi Labs empowers African students with digital learning and sustainable technology training, designed by African educators for career-focused STEM pathways.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">STEM Career Pathways</h3>
              <p className="text-slate-600 text-sm mb-4">
                Discover high-demand STEM careers in Kenya, from robotics to data science. Learn how to choose subject combinations for Grades 9-10 to unlock sustainable career paths.
              </p>
              <button
                onClick={() => handleNavigate('/programs')}
                className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors"
              >
                Explore STEM Programs
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-2">Women in STEM</h3>
              <p className="text-slate-600 text-sm mb-4">
                Empower the next generation of female scientists and engineers in Africa. Join our mentorship programs and virtual labs to promote gender equality in STEM.
              </p>
              <button
                onClick={scrollToForm}
                className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors"
              >
                Support Women in STEM
                <ChevronRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group border border-gray-100">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-600 to-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  <info.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">{info.title}</h3>
                <p className="text-slate-600 text-sm whitespace-pre-line mb-4">{info.details}</p>
                {info.link && (
                  <a 
                    href={info.link}
                    className="text-teal-600 hover:text-teal-700 font-medium text-sm inline-flex items-center transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {info.type === 'Office' ? 'View on Map' : 'Contact Now'}
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-white" id="contact-form-section">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-3xl font-light text-slate-800 mb-6">
                Join Our <span className="text-green-600 font-semibold">STEM Community</span>
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Collaborate with Kedi Labs to advance digital STEM education in Kenya, empower women in STEM, or support sustainable technology training in national schools.
              </p>
              <div className="space-y-3">
                {stakeholderTypes.map((type, index) => {
                  const isActive = activeForm === type.id;
                  return (
                    <div
                      key={`${type.id}-${index}`}
                      onClick={() => handleFormTypeChange(type.id)}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                        isActive
                          ? 'border-teal-500 bg-teal-50 shadow-lg' 
                          : 'border-gray-200 hover:border-teal-300 hover:bg-gray-50 hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-start">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
                          isActive ? 'bg-teal-600 shadow-lg' : 'bg-gray-400'
                        }`}>
                          <type.icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold mb-1 transition-colors duration-300 ${
                            isActive ? 'text-teal-800' : 'text-slate-800'
                          }`}>
                            {type.label}
                          </h3>
                          <p className="text-sm text-slate-600 leading-relaxed">{type.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-gray-50 rounded-2xl p-8">
                <h3 className="text-2xl font-semibold text-slate-800 mb-6">
                  {getCurrentStakeholder()?.label} Form
                  <span className="text-sm text-gray-500 ml-2">({activeForm})</span>
                </h3>
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                    <span className="text-green-800">Thank you! Your message has been submitted successfully. We'll get back to you soon!</span>
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
                    <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0" />
                    <span className="text-red-800">{errorMessage || 'An error occurred. Please try again later.'}</span>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {shouldShowField('name') && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                          placeholder="Enter your full name"
                        />
                      </div>
                    )}
                    {shouldShowField('email') && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {shouldShowField('phone') && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                          placeholder="+254 700 000 000"
                        />
                      </div>
                    )}
                    {shouldShowField('organization') && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Organization
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                          placeholder="Your organization/institution"
                        />
                      </div>
                    )}
                  </div>
                  {shouldShowField('subject') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                        placeholder="Brief subject of your inquiry"
                      />
                    </div>
                  )}
                  {shouldShowField('interests') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Areas of Interest *
                      </label>
                      <select
                        name="interests"
                        value={formData.interests}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      >
                        <option value="">Select your interests</option>
                        <option value="STEM Education">STEM Education Kenya</option>
                        <option value="Women in STEM">Women in STEM</option>
                        <option value="Career Pathways">STEM Career Pathways</option>
                        <option value="Curriculum Development">Curriculum Development</option>
                        <option value="Sustainable Technology">Sustainable Technology Training</option>
                        <option value="Community Outreach">Community Outreach</option>
                        <option value="Research & Development">Research & Development</option>
                        <option value="Event Organization">Event Organization</option>
                        <option value="Other">Other (please specify)</option>
                      </select>
                      {formData.interests === 'Other' && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Please specify your interest
                          </label>
                          <input
                            type="text"
                            name="interestsOther"
                            value={formData.interestsOther}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                            placeholder="Enter your specific interest"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {shouldShowField('availability') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Availability
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      >
                        <option value="">Select your availability</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Weekends only">Weekends only</option>
                        <option value="Project-based">Project-based</option>
                        <option value="Event-based">Event-based</option>
                      </select>
                    </div>
                  )}
                  {shouldShowField('experience') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Relevant Experience
                      </label>
                      <textarea
                        name="experience"
                        rows="3"
                        value={formData.experience}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                        placeholder="Tell us about your experience in STEM education or sustainable technology..."
                      ></textarea>
                    </div>
                  )}
                  {shouldShowField('fundingAmount') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Potential Funding Amount (USD)
                      </label>
                      <select
                        name="fundingAmount"
                        value={formData.fundingAmount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      >
                        <option value="">Select funding range</option>
                        <option value="$1,000 - $5,000">$1,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                        <option value="$50,000+">$50,000+</option>
                        <option value="Prefer to discuss">Prefer to discuss</option>
                      </select>
                    </div>
                  )}
                  {shouldShowField('investmentType') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Investment Type
                      </label>
                      <select
                        name="investmentType"
                        value={formData.investmentType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                      >
                        <option value="">Select investment type</option>
                        <option value="Grant/Donation">Grant/Donation</option>
                        <option value="Impact Investment">Impact Investment</option>
                        <option value="Sponsorship">Sponsorship</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Equipment/Resources">Equipment/Resources</option>
                        <option value="Other">Other (please specify)</option>
                      </select>
                      {formData.investmentType === 'Other' && (
                        <div className="mt-3">
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Please specify investment type
                          </label>
                          <input
                            type="text"
                            name="investmentTypeOther"
                            value={formData.investmentTypeOther}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors"
                            placeholder="Enter your specific investment type"
                          />
                        </div>
                      )}
                    </div>
                  )}
                  {shouldShowField('message') && (
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        rows="5"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-colors resize-none"
                        placeholder="Tell us how you want to collaborate on STEM education in Kenya..."
                      ></textarea>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-teal-600 to-green-600 hover:from-teal-700 hover:to-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="h-5 w-5 ml-2" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Hub Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light text-slate-800 mb-4">
              Visit Our <span className="text-green-600 font-semibold">Innovation Hub</span>
            </h2>
            <p className="text-lg text-slate-600">
              Located in Kisumu, driving sustainable STEM education in Kenya
            </p>
          </div>
          <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
            <div className="aspect-w-16 aspect-h-9 h-96">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d124183.08858011256!2d34.66108667578538!3d-0.018737386036050647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182aa505cd99a173%3A0x2b61e11f4f6c4374!2sCounty%20Government%20Of%20Kisumu!5e1!3m2!1sen!2ske!4v1754238951876!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kedi Labs Innovation Hub Location"
              ></iframe>
            </div>
            <div className="p-8 bg-gradient-to-r from-slate-50 to-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <p className="font-semibold text-slate-800">Address</p>
                    <p className="text-slate-600">Kisumu, Kenya</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <p className="font-semibold text-slate-800">Office Hours</p>
                    <p className="text-slate-600">Mon - Fri: 8:00 AM - 6:00 PM</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Globe className="h-6 w-6 text-teal-600 mr-3" />
                  <div>
                    <p className="font-semibold text-slate-800">Timezone</p>
                    <p className="text-slate-600">EAT (UTC+3)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Response CTA Section */}
      <section className="py-16 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light mb-6">
            Need a <span className="text-teal-400 font-semibold">Quick Response</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Reach out to Kedi Labs for urgent inquiries about STEM education, partnerships, or sustainable technology training.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:contact@kedilabs.net"
              className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center group"
            >
              <Mail className="h-5 w-5 mr-2" />
              Email Us Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a 
              href="tel:+254 711731625"
              className="border-2 border-teal-400 hover:bg-teal-400 hover:text-slate-800 text-teal-400 px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center group"
            >
              <Phone className="h-5 w-5 mr-2" />
              Call Us
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="mt-6">
            {/* <button
              onClick={() => handleNavigate('/donate')}
              className="text-teal-400 hover:text-teal-300 font-medium text-sm inline-flex items-center transition-colors"
            >
              Support Innovation
              <ChevronRight className="h-4 w-4 ml-1" />
            </button> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default KediLabsContact;