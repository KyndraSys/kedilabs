


import React, { useEffect, useState } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  Building2,
  Users,
  Globe,
  Award,
  BookOpen,
  Cpu,
  Handshake,
  GraduationCap,
  Microscope,
  Laptop,
  Heart,
  Target,
  Zap,
  Shield,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Plus,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useLocation } from 'react-router-dom';
import Seo from '../components/Seo';

const KediPartnersPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const location = useLocation();
  
  // Scroll to section based on query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);
  
  // Ensure correct title on page load
  useEffect(() => {
    document.title = "Kedi Labs Partners - Collaborating for STEM Education Impact in Kenya";
  }, []);

  // Function to handle navigation with cache busting
  const handleNavigate = (url) => {
    const cacheBustUrl = `${url}?t=${Date.now()}`; // Add timestamp to bust cache
    window.location.href = cacheBustUrl; // Force full page reload
  };

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };
  
  const partnerCategories = [
    {
      id: 'educational',
      title: 'Educational Institutions',
      description: 'Universities, technical colleges, and research institutions across East Africa seeking to enhance their STEM programs with digital learning solutions.',
      partners: [
        'University of Nairobi',
        'Makerere University',
        'University of Dar es Salaam',
        'Kigali Institute of Science and Technology',
        'Technical University of Kenya',
        'Addis Ababa University'
      ],
      icon: BookOpen,
      color: 'bg-green-50 border-green-200',
      valueProps: [
        'Access to virtual laboratory infrastructure',
        'Educator training and certification programs',
        'Curriculum development support',
        'Student placement opportunities'
      ]
    },
    {
      id: 'technology',
      title: 'Technology Partners',
      description: 'Leading EdTech companies, hardware/software providers, and digital platform developers committed to advancing STEM education in Africa.',
      partners: [
        'Microsoft Education',
        'Google for Education',
        'Cisco Networking Academy',
        'Intel Education',
        'Amazon Web Services',
        'Siemens Digital Industries'
      ],
      icon: Cpu,
      color: 'bg-blue-50 border-blue-200',
      valueProps: [
        'Market access to educational institutions',
        'Co-development of localized solutions',
        'Pilot programs for new technologies',
        'Brand visibility in growing STEM ecosystem'
      ]
    },
    {
      id: 'funding',
      title: 'Funding & Development Partners',
      description: 'Development finance institutions, private foundations, government agencies, and corporate sponsors investing in Africa\'s digital future.',
      partners: [
        'World Bank Group',
        'African Development Bank',
        'Gates Foundation',
        'Mastercard Foundation',
        'USAID',
        'UK Foreign Commonwealth Office'
      ],
      icon: Handshake,
      color: 'bg-purple-50 border-purple-200',
      valueProps: [
        'Measurable impact on STEM education metrics',
        'Scalable solutions with sustainable models',
        'Alignment with UN Sustainable Development Goals',
        'Comprehensive reporting and transparency'
      ]
    },
    {
      id: 'community',
      title: 'Community & Implementation Partners',
      description: 'Local organizations, NGOs, and community groups that facilitate grassroots implementation of STEM programs.',
      partners: [
        'Local STEM advocacy groups',
        'Youth development organizations',
        'Women in STEM initiatives',
        'Community technology centers'
      ],
      icon: Users,
      color: 'bg-orange-50 border-orange-200',
      valueProps: [
        'Direct community impact and engagement',
        'Localized implementation expertise',
        'Expanded reach to underserved populations',
        'Cultural and contextual understanding'
      ]
    }
  ];
  
  const partnershipBenefits = [
    {
      title: 'Strategic Collaboration',
      description: 'Co-create innovative STEM education solutions specifically designed for African learning contexts and challenges.',
      icon: Target,
      details: 'Joint curriculum development, research partnerships, and program design'
    },
    {
      title: 'Resource Sharing',
      description: 'Access to cutting-edge educational technologies, virtual laboratories, and digital learning platforms.',
      icon: Zap,
      details: 'Technology infrastructure, learning management systems, and digital content'
    },
    {
      title: 'Capacity Building',
      description: 'Comprehensive training programs and professional development for educators and technical staff.',
      icon: GraduationCap,
      details: 'Certification programs, workshops, and continuous learning opportunities'
    },
    {
      title: 'Network Access',
      description: 'Connect with a growing ecosystem of educational leaders, innovators, and change-makers across Africa.',
      icon: Globe,
      details: 'Industry events, partner summits, and collaborative forums'
    },
    {
      title: 'Impact Measurement',
      description: 'Robust monitoring and evaluation frameworks to track and demonstrate educational outcomes.',
      icon: Microscope,
      details: 'Learning analytics, impact reports, and success metrics'
    },
    {
      title: 'Market Development',
      description: 'Opportunities to pilot and scale innovative educational technologies in emerging markets.',
      icon: Laptop,
      details: 'Test new products, gather user feedback, and expand market presence'
    }
  ];
  
  const impactStats = [
    { number: '180+', label: 'Schools Targeted' },
    { number: '1,000+', label: 'Educators in Training' },
    { number: '15,000+', label: 'Students Impacted' },
    { number: '15', label: 'Counties Reached' }
  ];
  
  const faqItems = [
    {
      question: "What types of organizations does Kedi Labs partner with?",
      answer: "We partner with four main categories: Educational Institutions (universities, technical colleges), Technology Partners (EdTech companies, hardware/software providers), Funding & Development Partners (foundations, government agencies), and Community & Implementation Partners (NGOs, local organizations). Each partnership is tailored to maximize impact in STEM education across Africa."
    },
    {
      question: "What is the process for becoming a partner?",
      answer: "The process begins with completing our contact form expressing your interest. Our partnership team will initiate discussions within 24 hours to understand your goals and explore alignment. This is followed by a proposal development phase, agreement finalization, and implementation planning. The entire process typically takes 2-4 weeks depending on the complexity of the partnership."
    },
    {
      question: "What resources do partners receive?",
      answer: "Partners gain access to our virtual laboratory platform, educator training programs, curriculum resources, and technical support. Additionally, partners benefit from our network connections, co-marketing opportunities, implementation support, and comprehensive impact reporting. The specific resources vary based on the partnership category and agreement terms."
    },
    {
      question: "How does Kedi Labs measure partnership success?",
      answer: "We employ a comprehensive monitoring and evaluation framework that tracks key metrics including student learning outcomes, educator competency development, technology adoption rates, and employment pathways. Partners receive quarterly impact reports with detailed analytics and success stories demonstrating the tangible results of our collaborative efforts."
    },
    {
      question: "Can organizations outside Kenya partner with Kedi Labs?",
      answer: "Absolutely. While our initial focus is on Kenya and East Africa, we welcome partnerships with international organizations that share our mission. We have particular interest in technology partners with global expertise and funding partners committed to African educational development. Our expansion plan includes scaling successful models to other African regions."
    },
    {
      question: "What makes Kedi Labs different from other STEM initiatives?",
      answer: "Our unique value proposition lies in our focus on virtual laboratory solutions that overcome physical infrastructure limitations, our deep understanding of the African educational context, our industry-aligned curriculum, and our multi-stakeholder partnership model. We bridge the gap between theoretical learning and practical application, specifically addressing the STEM skills gap in resource-constrained environments."
    }
  ];

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kedi Labs - Kenya Digital Laboratories",
    "alternateName": "Kenya Digital Labs",
    "url": "https://kedilabs.net/partners",
    "description": "Join Kedi Labs’ network of over 50 partners, including universities, EdTech companies, and NGOs, to drive STEM education impact in Kenya through virtual labs, educator training, and strategic collaborations.",
    "foundingLocation": {
      "@type": "Place",
      "name": "Kisumu, Kenya"
    },
    "areaServed": "Kenya",
    "serviceType": [
      "STEM Education Policy Advocacy",
      "Educator Training Programs",
      "Virtual Laboratory Solutions",
      "Digital Learning Toolkits"
    ],
    "audience": [
      "STEM Students",
      "Educators",
      "Educational Institutions",
      "Government",
      "Development Partners"
    ],
    "keywords": "Kedi Labs partners, STEM education Kenya, virtual labs partnerships, EdTech collaborations, STEM advocacy Africa, Kenya education partners"
  };

  // SEO Component placeholder
  const Seo = ({ title, description, canonical, schemaMarkup }) => (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <script type="application/ld+json">{JSON.stringify(schemaMarkup)}</script>
    </>
  );

  return (
    <div className="min-h-screen bg-white">
      <Seo 
        title="Kedi Labs Partners - Collaborating for STEM Education Impact in Kenya"
        description="Join Kedi Labs’ network of over 50 partners, including universities, EdTech companies, and NGOs, to drive STEM education impact in Kenya through virtual labs, educator training, and strategic collaborations."
        canonical="https://kedilabs.net/partners"
        schemaMarkup={schemaMarkup}
      />
      {/* Meta tags to prevent caching */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />

      {/* Hero Section */}
      <section className="relative bg-white py-16 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-96 h-96 border-2 border-green-200 rotate-45 rounded-3xl opacity-30"></div>
          <div className="absolute bottom-32 left-32 w-72 h-72 border-2 border-teal-200 rotate-12 rounded-2xl opacity-30"></div>
          <div className="absolute top-40 left-1/4 w-48 h-48 border border-cyan-200 rotate-6 rounded-xl opacity-20"></div>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-left max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 leading-tight">
              Join 50+ partners
              <br />
              driving{" "}
              <span className="text-green-600 underline decoration-green-400 decoration-4">
                STEM impact.
              </span>
            </h1>

            <p className="text-xl text-gray-700 mb-12 max-w-3xl leading-relaxed">
              From universities and research institutions to technology
              companies and NGOs, we leverage partnerships to help Kenyan
              students and educators access cutting-edge STEM education through
              virtual laboratories and digital learning solutions.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.75 2.524z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Educational Partners
                </h3>
                <p className="text-gray-600 text-sm">
                  Universities, colleges, and schools implementing virtual STEM
                  labs
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-teal-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Technology Partners
                </h3>
                <p className="text-gray-600 text-sm">
                  Tech companies providing infrastructure and development
                  support
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-cyan-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Impact Partners
                </h3>
                <p className="text-gray-600 text-sm">
                  NGOs and foundations supporting STEM education initiatives
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Impact - Dark Theme */}
      <section className="py-16 bg-[#1d273a]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-light text-white mb-6">
              Driving{" "}
              <span className="text-green-400 font-semibold">
                Transformative Impact
              </span>{" "}
              Together
            </h2>
            <p className="text-lg text-gray-300 max-w-4xl leading-relaxed">
              Our partnerships create measurable change in STEM education across
              Kenya, addressing critical gaps in digital infrastructure,
              educator capacity, and student readiness for the technology-driven
              economy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {partnershipBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={index}
                  className="bg-[#273349] rounded-lg p-8 shadow-lg"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <Icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    {benefit.description}
                  </p>
                  <p className="text-sm text-gray-400">{benefit.details}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partner Categories */}
      <section id="partnership-categories" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-6">
              Partnership{" "}
              <span className="text-green-600 font-semibold">Categories</span>
            </h2>
            <p className="text-lg text-gray-700 max-w-4xl leading-relaxed">
              We collaborate with diverse organizations across four key
              categories to advance STEM education and create sustainable impact
              across Africa.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {partnerCategories.map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  id={category.id}
                  className="bg-white Sony Corporation
                  rounded-lg p-8"
                >
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mr-6">
                      <Icon className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-medium text-gray-900 mb-2">
                        {category.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Partnership Process */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-slate-800 mb-6">
              Our Partnership{" "}
              <span className="text-green-600 font-semibold">Process</span>
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
              We've developed a streamlined approach to ensure successful
              collaborations that deliver measurable impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                1
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Initial Contact
              </h3>
              <p className="text-slate-600 text-sm">
                Complete our contact form to express interest
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                2
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Discovery Call
              </h3>
              <p className="text-slate-600 text-sm">
                We initiate discussions within 24 hours
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                3
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Proposal Development
              </h3>
              <p className="text-slate-600 text-sm">
                Co-create customized partnership framework
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-xl font-bold">
                4
              </div>
              <h3 className="font-semibold text-slate-800 mb-2">
                Implementation
              </h3>
              <p className="text-slate-600 text-sm">
                Launch and scale with ongoing support
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-4 h-4 bg-green-500"></div>
              <h2 className="text-2xl font-normal text-gray-900">
                Frequently asked questions
              </h2>
            </div>
          </div>

          <div className="space-y-0 border border-gray-200 bg-white rounded-lg overflow-hidden">
            {faqItems.map((faq, index) => (
              <div
                key={index}
                className={index !== 0 ? "border-t border-gray-200" : ""}
              >
                <button
                  className="flex items-center justify-between w-full p-6 text-left hover:bg-gray-50 transition-colors group"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-normal text-gray-900 text-base pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0">
                    <Plus
                      className={`h-6 w-6 text-gray-400 transition-transform duration-200 ${
                        openFaq === index ? "rotate-45" : ""
                      }`}
                    />
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 border-t border-gray-100 bg-gray-50">
                    <div className="pt-4">
                      <p className="text-gray-700 text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What our partners say */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-16">
            What our partners say
          </h2>

          <div className="mb-12">
            <div className="text-6xl text-green-500 mb-8">"</div>
            <blockquote className="text-xl text-gray-700 italic mb-8 leading-relaxed max-w-3xl mx-auto">
              "The collaboration with Kedi Labs was transformative for our
              students. Their virtual STEM labs provided hands-on learning
              experiences we couldn't offer before, and the training support
              helped our educators deliver world-class instruction."
            </blockquote>
            <div className="text-center"></div>
          </div>

          <div className="flex justify-center space-x-4 mb-16">
            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300 transition-colors">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light text-white mb-6">
            Ready to Transform STEM Education?
          </h2>
          <p className="text-lg text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
            Join our network of visionary partners and help build Africa's next
            generation of STEM leaders.
          </p>

          <button
            onClick={() => navigate("/contact")}
            className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Join as a Partner
          </button>

          <p className="text-sm text-gray-400 mt-6">
            Our partnership team will contact you within 24 hours.
          </p>
        </div>
      </section>
    </div>
  );
};

export default KediPartnersPage;