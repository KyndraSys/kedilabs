import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Award, Globe, Lightbulb, BookOpen, Target, ArrowRight, Play, CheckCircle, Star, Zap, Shield, Cpu, Network, Eye, Settings, Microscope, GraduationCap, Cog, FlaskConical, Binary, Phone, Mail, MapPin, ExternalLink, ChevronDown, Heart, Compass, Rocket, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const KediLabsAbout = () => {
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  

  const milestones = [
    { year: "2021", title: "Foundation & Vision", description: "Kedi Labs established in Nairobi with a bold vision to transform STEM education across Africa through innovative digital solutions" },
    { year: "2022", title: "Community Building", description: "Launched our first virtual labs pilot program, engaging 25 educational institutions and building our foundational educator network" },
    { year: "2023", title: "Technology Innovation", description: "Developed our comprehensive virtual laboratory toolkit and expanded digital training programs to reach more institutions" },
    { year: "2024", title: "Scale & Impact", description: "Achieved significant reach with 180+ schools targeted and 1,000+ educators in our training pipeline across Kenya" },
    { year: "2025", title: "Future Forward", description: "Positioning for sustainable growth with enhanced AI-powered learning platforms and expanded regional presence" }
  ];

  const recognitions = [
    { 
      title: "Innovation in STEM Education", 
      source: "Kenya Education Technology Summit",
      description: "Recognized for pioneering virtual laboratory solutions in East Africa"
    },
    { 
      title: "Digital Learning Excellence", 
      source: "African EdTech Alliance",
      description: "Acknowledged for outstanding contribution to digital pedagogy"
    },
    { 
      title: "Community Impact Leadership", 
      source: "Nairobi Innovation Hub",
      description: "Celebrated for transformative educational technology initiatives"
    },
    { 
      title: "Sustainable Development Goals Advocate", 
      source: "UN Educational Partners",
      description: "Commended for advancing SDG 4: Quality Education across Kenya"
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

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Dark overlay with subtle gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-slate-900/90 z-10"></div>
          
          {/* Futuristic background image */}
          <div className="absolute inset-0">
            <img
              src="https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0iG0h3QLWHywEnTc0bSzVxR4KgXYaBIMudqjA"
              alt="Futuristic Technology Lab"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          {/* Subtle geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-96 h-96 border border-cyan-400 rotate-45 rounded-3xl"></div>
            <div className="absolute bottom-32 left-32 w-72 h-72 border border-teal-400 rotate-12 rounded-2xl"></div>
            <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-green-400 -rotate-12 rounded-xl"></div>
          </div>

          {/* Glowing orbs */}
          <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"></div>
          <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-green-400 rounded-full shadow-lg shadow-green-400/50 animate-pulse delay-1000"></div>
          <div className="absolute top-2/3 right-1/2 w-3 h-3 bg-teal-400 rounded-full shadow-lg shadow-teal-400/50 animate-pulse delay-500"></div>
        </div>

        {/* Breadcrumb */}
        <div className="relative z-20 pt-4">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center text-sm text-slate-400">
              <span 
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <Link to="/">Home</Link>
              </span>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-cyan-400 font-medium">About Kedi Labs</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20 flex items-center min-h-screen">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-5xl">
              {/* Badge */}
              <div className="mb-8 animate-fade-in">
                <span className="inline-flex items-center bg-slate-800/60 backdrop-blur-sm text-cyan-400 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-cyan-400/30 shadow-lg">
                  <FlaskConical className="h-5 w-5 mr-3" />
                  About Kedi Labs
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight animate-slide-up">
                Pioneering{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-400 to-green-400 font-normal">
                  digital STEM education
                </span>{' '}
                across Africa
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl font-light animate-slide-up delay-200">
                We're revolutionizing how students learn science, technology, engineering, and mathematics by making world-class virtual laboratories and digital learning tools accessible to every institution across Kenya and beyond.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-6 animate-slide-up delay-400">
                <Link 
                  to="/contact"
                  className="group relative bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-cyan-500/25 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Learn About Our Impact
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link 
                  to="/programs"
                  className="group border-2 border-slate-600 hover:border-teal-400 text-slate-300 hover:text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center backdrop-blur-sm bg-slate-800/20 hover:bg-slate-700/30"
                >
                  View Our Programs
                  <ExternalLink className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-teal-400" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent z-15"></div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission-vision" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Mission */}
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-teal-100 to-green-100 rounded-full opacity-20"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-green-600 rounded-xl flex items-center justify-center mb-6">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-light text-slate-800 mb-6">Our Mission</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  To transform STEM education in Kenya by providing comprehensive digital learning solutions that bridge the gap between theoretical knowledge and practical application, ensuring every student has access to world-class laboratory experiences regardless of their institution's physical infrastructure.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">Democratize access to advanced STEM laboratory experiences</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">Empower educators with cutting-edge digital pedagogy tools</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="h-6 w-6 text-green-600 mr-4 mt-1 flex-shrink-0" />
                    <span className="text-slate-600">Prepare students for the digital economy through hands-on learning</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Vision */}
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full opacity-20"></div>
              <div className="relative z-10">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center mb-6">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-4xl font-light text-slate-800 mb-6">Our Vision</h2>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  A Kenya where every STEM student has equal access to world-class laboratory experiences, where educators are empowered with digital tools, and where innovative minds are nurtured to solve tomorrow's challenges through technology and scientific excellence.
                </p>
                <div className="bg-gradient-to-r from-green-50 to-teal-50 p-6 rounded-xl border-l-4 border-green-600">
                  <blockquote className="text-slate-700 italic text-lg">
                    "We believe that when we remove barriers to quality STEM education, we unlock the potential of an entire generation to innovate, create, and lead Kenya into a technology-driven future."
                  </blockquote>
                  <cite className="text-sm text-slate-500 mt-4 block">- Kedi Labs Founding Team</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Technology Connects Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-teal-100/30 to-green-100/30 rounded-3xl transform rotate-6"></div>
              <img 
                src="https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0ADxWxhvE5603fcngFOYPqJIZWH1pzsh2Uwlo?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Digital STEM Learning Network"
                className="relative z-10 w-full rounded-2xl shadow-2xl"
              />
            </div>
            <div>
              <h2 className="text-5xl font-light text-slate-800 mb-8 leading-tight">
                Breaking barriers through <span className="text-green-600 font-semibold">innovation</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our comprehensive virtual laboratories, educator training programs, and policy advocacy initiatives are designed specifically for the Kenyan education context. We combine local understanding with global best practices to create sustainable, scalable solutions that truly transform learning outcomes.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">180+</div>
                  <div className="text-sm text-slate-600">Schools Targeted</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-1">1,000+</div>
                  <div className="text-sm text-slate-600">Educators in Training</div>
                </div>
              </div>
              <Link 
                to="/programs"
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center group"
              >
                Explore our technology
                <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Journey & Milestones */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div className="sticky top-8 z-0">
              <h2 className="text-5xl font-light text-slate-800 mb-8 leading-tight">
                Our journey of <span className="text-green-600 font-semibold">impact</span>
              </h2>
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                From our founding in 2021 to our current reach across Kenya, discover how we've grown from a bold vision into a transformative force in STEM education, touching thousands of lives and reshaping how students experience science and technology.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-green-600 mb-1">15,000+</div>
                  <div className="text-sm text-slate-600">Students Impacted</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <div className="text-xl font-bold text-green-600 mb-1">95%</div>
                  <div className="text-sm text-slate-600">Training Success Rate</div>
                </div>
              </div>
              <Link 
                to="/blog"
                className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200"
              >
                Read Our Blog
              </Link>
            </div>
            
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex items-start group">
                  <div className="flex-shrink-0 w-24 text-right mr-8">
                    <span className="text-2xl font-bold text-green-600">{milestone.year}</span>
                  </div>
                  <div className="flex-1 pb-8 border-l-2 border-gray-200 pl-8 relative">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-green-600 rounded-full"></div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-3 group-hover:text-green-600 transition-colors">
                      {milestone.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recognition & Community Impact */}
      <section className="py-24 bg-slate-800 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-light mb-6">
              Community <span className="text-green-400 font-semibold">recognition</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our dedication to transforming STEM education has earned recognition from educational leaders, technology communities, and policy makers across Kenya.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {recognitions.map((recognition, index) => (
              <div key={index} className="bg-slate-700/50 p-8 rounded-xl border border-slate-600 hover:border-green-400 transition-all duration-300 group">
                <div className="flex items-start mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-teal-600 rounded-lg flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                    <Trophy className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-green-400 transition-colors">
                      {recognition.title}
                    </h3>
                    <p className="text-green-400 text-sm font-medium mb-3">{recognition.source}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{recognition.description}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <div className="inline-flex items-center bg-slate-700/50 px-6 py-4 rounded-xl">
              <Heart className="h-5 w-5 text-red-400 mr-3" />
              <span className="text-gray-300">Proudly serving Kenya's STEM education community since 2021</span>
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
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .delay-500 {
          animation-delay: 0.5s;
        }

        @media (max-width: 768px) {
          .text-8xl {
            font-size: 3.5rem;
            line-height: 1.1;
          }
          
          .text-5xl {
            font-size: 2.5rem;
            line-height: 1.2;
          }
        }
      `}</style>
    </div>
  );
};

export default KediLabsAbout;