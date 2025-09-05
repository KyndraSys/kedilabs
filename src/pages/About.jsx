import React, { useState, useEffect } from 'react';
import { ChevronRight, Target, ArrowRight, CheckCircle, Eye, Rocket, TrendingUp, Zap, Shield, Building, Globe } from 'lucide-react';
import Seo from '../components/Seo';

const KediLabsAbout = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // Function to handle navigation with cache busting
  const handleNavigate = (url) => {
    const cacheBustUrl = `${url}?t=${Date.now()}`; // Add timestamp to bust cache
    window.location.href = cacheBustUrl; // Force full page reload
  };

  const strategicPillars = [
    {
      icon: <Target className="h-8 w-8" />,
      title: "Strategic Market Position",
      description: "Positioned at the intersection of Kenya's digital transformation and STEM workforce development—two critical national priorities driving economic growth."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Scalable Impact Model", 
      description: "Our technology-enabled approach allows exponential reach without proportional cost increases, creating sustainable competitive advantages in educational delivery."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Risk Mitigation Strategy",
      description: "Diversified revenue streams across government partnerships, private institutions, and development finance—reducing dependency on any single funding source."
    }
  ];

  const competitiveAdvantages = [
    {
      metric: "10x",
      description: "Cost reduction compared to traditional lab infrastructure",
      detail: "Our virtual labs eliminate the need for expensive equipment while delivering equivalent learning outcomes"
    },
    {
      metric: "95%",
      description: "Educator training completion rate",
      detail: "Industry-leading retention demonstrates the practical value of our professional development programs"
    },
    {
      metric: "3.2x",
      description: "Faster skill acquisition in digital-first environments",
      detail: "Students using our platforms demonstrate accelerated competency development compared to traditional methods"
    },
    {
      metric: "180+",
      description: "Institutional partnerships in development pipeline",
      detail: "Strategic relationships position us for rapid market expansion across education sector in Kenya and beyond"
    }
  ];

  const marketIntelligence = [
    {
      insight: "Kenya's STEM Skills Gap",
      data: "68% of employers report difficulty finding qualified technical talent",
      implication: "Creates urgent demand for improved STEM education outcomes"
    },
    {
      insight: "Digital Infrastructure Growth", 
      data: "Internet penetration increased 23% annually (2020-2024)",
      implication: "Enables scalable delivery of digital education solutions nationwide"
    },
    {
      insight: "Government Investment Priority",
      data: "KES 45B allocated to digital learning initiatives (2024-2027)",
      implication: "Policy alignment creates favorable environment for our solutions"
    }
  ];

  const executiveTeamHighlights = [
    {
      title: "Deep Domain Expertise",
      description: "Combined 40+ years of experience in STEM education, technology implementation, and African market development"
    },
    {
      title: "Strategic Network Access",
      description: "Direct relationships with Ministry of Education officials, university chancellors, and industry leaders across East Africa"
    },
    {
      title: "Proven Execution Track Record",
      description: "Successfully scaled technology solutions from concept to 180+ institutional partnerships in under 4 years"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Ensure correct title on page load
  useEffect(() => {
    document.title = "About Kedi Labs - Strategic STEM Education Transformation | Kenya Digital Laboratories";
  }, []);

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kedi Labs - Kenya Digital Laboratories",
    "alternateName": "Kenya Digital Labs",
    "url": "https://kedilabs.net/about",
    "description": "Learn about Kedi Labs’ mission to bridge Africa’s STEM skills gap through policy advocacy, educator training, and virtual laboratory solutions, founded in Kisumu to empower Kenya’s next generation of innovators.",
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
    "keywords": "About Kedi Labs, STEM education Kenya, Kenya STEM mission, virtual labs Africa, STEM skills gap, industry-ready graduates, STEM advocacy Kenya"
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
    <div className="min-h-screen bg-white font-sans">
      <Seo 
        title="About Kedi Labs - Strategic STEM Education Transformation | Kenya Digital Laboratories"
        description="Discover how Kedi Labs is strategically positioned to transform STEM education in Kenya and beyond through virtual laboratories, educator training, and policy advocacy. Leading Kenya's digital education revolution with measurable impact and scalable solutions."
        canonical="https://kedilabs.net/about"
        schemaMarkup={schemaMarkup}
      />
      {/* Meta tags to prevent caching */}
      <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
      <meta httpEquiv="Pragma" content="no-cache" />
      <meta httpEquiv="Expires" content="0" />

      {/* Hero Section - Executive Positioning */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/75 to-slate-900/95 z-10"></div>
        
        <div className="absolute inset-0">
          <img
            src="https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0iG0h3QLWHywEnTc0bSzVxR4KgXYaBIMudqjA"
            alt="Strategic STEM education transformation in Kenya"
            className="w-full h-full object-cover opacity-60"
          />
        </div>

        <div className="absolute inset-0 opacity-10 z-15">
          <div className="absolute top-20 right-20 w-96 h-96 border border-cyan-400 rotate-45 rounded-3xl"></div>
          <div className="absolute bottom-32 left-32 w-72 h-72 border border-teal-400 rotate-12 rounded-2xl"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-green-400 -rotate-12 rounded-xl"></div>
        </div>

        {/* Breadcrumb */}
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
              <span className="text-cyan-400 font-medium">Strategic Overview</span>
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-5xl">
              <div className="mb-8 animate-fade-in">
                <span className="inline-flex items-center bg-slate-800/60 backdrop-blur-sm text-cyan-400 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-cyan-400/30 shadow-lg">
                  <Building className="h-5 w-5 mr-3" />
                  Strategic Overview
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight animate-slide-up">
                Architecting Kenya's 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 font-normal">
                  {' '}STEM Future
                </span>
              </h1>

              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-12 leading-relaxed max-w-5xl font-light animate-slide-up delay-200">
                We are strategically positioned at the intersection of Kenya's digital transformation and STEM workforce development—two critical national priorities that will define Kenya's competitive advantage in the global knowledge economy.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up delay-400">
                <button 
                  onClick={() => handleNavigate('/programs')}
                  className="bg-green-600 hover:bg-green-700 text-white px-10 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
                >
                  View Strategic Programs
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                
                <button 
                  onClick={() => handleNavigate('/partners')}
                  className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group"
                >
                  Partnership Opportunities
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-15"></div>
      </section>

      {/* Market Opportunity & Strategic Positioning */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Strategic Market Position
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Kenya's STEM education sector represents a $2.3B market opportunity driven by government digitalization initiatives, private sector skills demand, and demographic trends favoring technology adoption.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {strategicPillars.map((pillar, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-white">
                      {pillar.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{pillar.title}</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Market Intelligence</h3>
            <div className="space-y-6">
              {marketIntelligence.map((item, index) => (
                <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-white rounded-lg">
                  <div className="flex-1 mb-4 md:mb-0 md:mr-8">
                    <h4 className="font-semibold text-slate-900 mb-2">{item.insight}</h4>
                    <p className="text-2xl font-bold text-green-600 mb-2">{item.data}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-600">{item.implication}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Competitive Advantages & Metrics */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Competitive Differentiation
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Our technology-enabled approach creates sustainable competitive advantages through superior cost structures, proven execution, and strategic market positioning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {competitiveAdvantages.map((advantage, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl p-8 mb-6 group-hover:from-green-200 group-hover:to-emerald-200 transition-all duration-300">
                  <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">{advantage.metric}</div>
                  <div className="text-slate-900 font-semibold mb-2">{advantage.description}</div>
                </div>
                <p className="text-sm text-slate-600 leading-tight">{advantage.detail}</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Executive Team Capabilities</h3>
              <p className="text-slate-300 max-w-3xl mx-auto">
                Our leadership team combines deep technical expertise with strategic market knowledge, enabling rapid scaling and sustained competitive advantage.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {executiveTeamHighlights.map((highlight, index) => (
                <div key={index} className="text-center">
                  <h4 className="text-xl font-semibold text-green-400 mb-4">{highlight.title}</h4>
                  <p className="text-slate-300 leading-relaxed">{highlight.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision - Strategic Framework */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-teal-100 to-green-100 rounded-full opacity-20"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-light text-slate-800 mb-6">Strategic Mission</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  To systematically transform Kenya's STEM education infrastructure through scalable technology solutions, strategic policy advocacy, and comprehensive capacity building—creating measurable improvements in graduate employability and national innovation capacity.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">Deploy virtual laboratories across 500+ institutions by 2028</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">Train 5,000+ educators in digital-first STEM pedagogy</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">Influence national policy for digital education investment</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full opacity-20"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-light text-slate-800 mb-6">Long-Term Vision</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  To establish Kenya as the regional leader in STEM education excellence, where every graduate possesses industry-ready skills, where innovation drives economic growth, and where our educational model becomes the blueprint for digital transformation across Kenya and beyond.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-l-4 border-green-600">
                  <h3 className="font-semibold text-slate-800 mb-3">2030 Impact Target</h3>
                  <p className="text-slate-700 leading-relaxed">
                    By 2030, Kedi Labs graduates will represent 25% of Kenya's STEM workforce, with 90% employment rates within 6 months of graduation and average salaries 40% above national averages.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Growth Trajectory & Scaling Strategy */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Scaling Strategy & Growth Trajectory
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Our phased expansion model balances rapid growth with operational excellence, ensuring sustainable impact across Kenya's diverse educational landscape.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-8">Phase 1: Foundation (2021-2024)</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Proof of Concept</h4>
                    <p className="text-slate-600">Established virtual lab technology and validated market demand through 25+ pilot institutions</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Market Entry</h4>
                    <p className="text-slate-600">Built strategic partnerships with government agencies and education stakeholders</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Technology Platform</h4>
                    <p className="text-slate-600">Developed scalable infrastructure capable of supporting 1000+ concurrent users</p>
                  </div>
                </div>
              </div>

              <h3 className="text-3xl font-bold text-slate-900 mb-8 mt-12">Phase 2: Scale (2025-2028)</h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Rocket className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Nationwide Expansion</h4>
                    <p className="text-slate-600">Deploy to 500+ institutions across all 47 counties with localized support</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Advanced Analytics</h4>
                    <p className="text-slate-600">Implement AI-powered learning analytics for personalized education pathways</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-4 mt-1">
                    <Globe className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-2">Regional Leadership</h4>
                    <p className="text-slate-600">Expand to Uganda, Tanzania, and Rwanda as regional STEM education hub</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <img 
                src="https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0NhEujm7G60XZqtR25T9YSCuBbgIeFoiHafjm"
                alt="Kedi Labs strategic growth and virtual laboratory implementation"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action - Partnership Focus */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23008B8B' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="mb-8">
              <span className="bg-green-600/20 text-green-400 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-green-600/30">
                Strategic Partnerships
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-light mb-8 leading-tight">
              Join Kenya's STEM Transformation
            </h2>
            <p className="text-xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto">
              Partner with us to shape the future of Africa's most critical sector. Whether you're a government agency, development finance institution, technology provider, or educational leader—we have strategic opportunities that create mutual value.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => handleNavigate('/contact')}
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
              >
                Explore Partnerships
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </button>
              <button 
                onClick={() => handleNavigate('/programs')}
                className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-12 py-5 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group"
              >
                View Our Solutions
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        
        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        
        .delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
      `}</style>
    </div>
  );
};

export default KediLabsAbout;