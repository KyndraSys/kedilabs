import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Award, Globe, Lightbulb, BookOpen, Megaphone, ArrowRight, Play, CheckCircle, Star, Zap, Shield, Cpu, Network, Eye, Settings, Microscope, GraduationCap, Cog, FlaskConical, Binary, Target, Handshake, Heart, BookmarkCheck, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavigationPills from '../components/NavigationPills';
import Seo from '../components/Seo';

const KediLabsHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  
  const navigate = useNavigate();

  const heroSlides = [
    {
      title: "Laying the Foundation for a STEM Tech Hub",
      subtitle: "Our long-term vision is to grow into a full-fledged STEM technology start-up — a platform where innovation, entrepreneurship, and research converge to fuel Africa’s digital economy.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      alt: "A diverse team collaborating on laptops, symbolizing the foundation of a STEM tech hub."
    },
    {
      title: "Policy & Advocacy for Digital Education",
      subtitle: "We are pushing for national investment in digital-first STEM learning — championing policies that prioritize access to modern resources, equitable opportunities, and future-ready education.",
      image: "https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ050eANcVhIFogcmNvK19QBbOS4yLjX6sE2MC8?w=800&h=600&fit=crop&crop=center",
      alt: "Government building representing policy and advocacy for digital education investment."
    },
    {
      title: "Training, Tools & Access for Educators and Students",
      subtitle: "From equipping STEM educators with digital teaching capacity to supplying Virtual Labs and Learning Toolkits, we focus on immediate, practical interventions that unlock real-world skills.",
      image: "https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0NhEujm7G60XZqtR25T9YSCuBbgIeFoiHafjm",
      alt: "Students using virtual lab technology in a classroom setting"
    }
  ];

  // Strategic startup metrics aligned with mission
 const impactStats = [
  { 
    number: "100+", 
    label: "Educators equipped with digital-first teaching capacity by 2028)", 
    icon: <Users className="h-8 w-8" /> 
  },
  { 
    number: "15+", 
    label: "Institutions piloting our virtual lab infrastructure by 2028)", 
    icon: <GraduationCap className="h-8 w-8" /> 
  },
  { 
    number: "500+", 
    label: "Students transitioned from theory to applied STEM learning by 2028)", 
    icon: <TrendingUp className="h-8 w-8" /> 
  },
  { 
    number: "3", 
    label: "Counties engaged in scalable deployment (our target: 5+ counties by 2028)", 
    icon: <Globe className="h-8 w-8" /> 
  }
];


  const corePrograms = [
    {
      icon: <Megaphone className="h-12 w-12" />,
      title: "Policy Advocacy",
      description: "Pushing for systemic change in how Africa approaches STEM education funding and resource allocation."
    },
    {
      icon: <GraduationCap className="h-12 w-12" />,
      title: "Educator Training",
      description: "Equipping teachers with modern STEM teaching methods and industry-relevant skills they can pass to students."
    },
    {
      icon: <FlaskConical className="h-12 w-12" />,
      title: "Virtual Labs & Resources",
      description: "Providing access to the same professional-grade tools and simulations used in top global companies."
    }
  ];

  const getInvolvedOptions = [
    {
      icon: <BookmarkCheck className="h-8 w-8" />,
      title: "Students & Learners",
      description: "Join our programs to gain real-world STEM skills",
      cta: "Apply for Programs",
      audience: "students"
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Volunteers & Mentors", 
      description: "Share your expertise with the next generation",
      cta: "Become a Mentor",
      audience: "volunteers"
    },
    {
      icon: <Handshake className="h-8 w-8" />,
      title: "Partners & Donors",
      description: "Support our mission to transform STEM education",
      cta: "Partner With Us",
      audience: "partners"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Educational Institutions",
      description: "Bring cutting-edge STEM resources to your students",
      cta: "Request Demo",
      audience: "institutions"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

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

  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kedi Labs - Kenya Digital Laboratories",
    "alternateName": "Kenya Digital Labs",
    "url": "https://kedilabs.net",
    "description": "Bridging Africa's STEM skills gap through policy advocacy, educator training, and virtual laboratory solutions. Making industry-ready STEM education accessible to all students in Kenya and beyond.",
    "foundingLocation": {
      "@type": "Place",
      "name": "Kisumu, Kenya"
    },
    "areaServed": "Kenya",
    "serviceType": ["STEM Education Policy Advocacy", "Educator Training Programs", "Virtual Laboratory Solutions", "Digital Learning Toolkits"],
    "audience": ["STEM Students", "Educators", "Educational Institutions", "Government", "Development Partners"],
    "keywords": "STEM education Kenya, STEM Institutions in Kenya, Kenya's STEM Leaders, How to get started in STEM,STEM Programs in Kenya, STEM education Africa, virtual labs Kenya, STEM skills gap, industry-ready graduates, STEM advocacy Kenya"
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Seo 
        title="Kedi Labs - Bridging Africa's STEM Skills Gap | Industry-Ready Education"
        description="Transforming Kenya's STEM education by bridging the skills gap between classroom theory and industry reality. We provide virtual labs, educator training, and policy advocacy to create job-ready graduates."
        canonical="https://kedilabs.net"
        schemaMarkup={schemaMarkup}
      />

      {/* Hero Section - Clear headline with primary CTA */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/75 to-slate-900/95 z-10"></div>
        
        <div className="absolute inset-0">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={`STEM education transformation - ${slide.title}`}
                className="w-full h-full object-cover opacity-50"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-0 opacity-10 z-15">
          <div className="absolute top-20 right-20 w-96 h-96 border border-cyan-400 rotate-45 rounded-3xl"></div>
          <div className="absolute bottom-32 left-32 w-72 h-72 border border-teal-400 rotate-12 rounded-2xl"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-green-400 -rotate-12 rounded-xl"></div>
        </div>

        <div className="relative z-20 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-5xl">
              <div className="mb-8 animate-fade-in">
                <span className="inline-flex items-center bg-slate-800/60 backdrop-blur-sm text-cyan-400 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-cyan-400/30 shadow-lg">
                  <FlaskConical className="h-5 w-5 mr-3" />
                  Building Kenya's STEM Future
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight animate-slide-up">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-12 leading-relaxed max-w-5xl font-light animate-slide-up delay-200">
                {heroSlides[currentSlide].subtitle}
              </p>
             <div className="flex flex-col sm:flex-row gap-6 animate-slide-up delay-400">
  <button 
    onClick={() => navigate('/programs')}
    className="group relative bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-green-500/25 overflow-hidden"
  >
    <span className="relative z-10 flex items-center">
   Get involved
      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </button>
  
  <button 
    onClick={() => navigate('/about')}
    className="group border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center backdrop-blur-sm bg-slate-800/20 hover:bg-slate-700/30"
  >
    About us
    <ChevronRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-400" />
  </button>
</div>

            </div>
          </div>
        </div>

        <NavigationPills />

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-cyan-400' : 'bg-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-15"></div>
      </section>

     {/* Problem Statement - Why It Matters */}
<section className="py-20 bg-gradient-to-b from-white to-gray-50">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="text-center mb-12">
      <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
        The Structural Gap in Kenya’s STEM Pipeline
      </h2>
      <div className="max-w-4xl mx-auto">
        <div className="bg-slate-50 border-l-4 border-slate-400 p-6 rounded-lg mb-8">
          <p className="text-xl text-slate-700 leading-relaxed">
            Kenya produces thousands of STEM graduates each year, yet most remain underutilized. The missing link isn’t talent—it’s alignment. The education pipeline is still optimized for theory, while industry demands applied, market-ready skills.
          </p>
        </div>
        <p className="text-lg text-slate-600 leading-relaxed">
          This gap is more than an academic issue. It suppresses innovation, limits employability, and slows the growth of Kenya’s digital economy. Addressing it isn’t optional—it’s a structural priority for national competitiveness.
        </p>
      </div>
    </div>
  </div>
</section>

      {/* Mission & Vision - Position as Movement */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Our Mission: Democratizing STEM Excellence
            </h2>
            <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Kedi Labs is more than an organization – we're a movement of spirited individuals committed to ensuring every Kenyan STEM student has access to industry-grade STEM resources and real-world skills training.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">What We Do</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We bridge the gap between classroom theory and industry reality by providing direct access to professional-grade STEM tools, comprehensive educator training, and strategic policy advocacy.
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Why It Matters</h3>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Every brilliant mind deserves the chance to solve real-world problems. When we give students the same tools used by top companies worldwide, we unlock Africa's innovation potential.
              </p>
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Big Picture Goal</h3>
              <p className="text-lg text-slate-600 leading-relaxed">
                To make Kenya the regional leader in producing job-ready STEM graduates who can immediately contribute to solving Africa's biggest challenges.
              </p>
            </div>
            <div>
              <img 
                src="https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0iG0h3QLWHywEnTc0bSzVxR4KgXYaBIMudqjA"
                alt="STEM education transformation in Kenya"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Programs - What We Do (keeping existing but simplified) */}
      <section id="programs" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              How We're Making Change Happen
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three strategic approaches to transform Africa's STEM education landscape
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {corePrograms.map((program, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-green-100 text-green-600 rounded-2xl">
                    {program.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{program.title}</h3>
                <p className="text-gray-600 leading-relaxed">{program.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button 
              onClick={() => navigate('/programs')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Learn More About Our Programs
            </button>
          </div>
        </div>
      </section>

 
      <section id="impact-stats" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
              Our Target at a Glance
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our Strategic Impact Metrics Aligned with Our Mission
            </p>
          </div>
          <div className={`grid grid-cols-2 lg:grid-cols-4 gap-8 ${
            isVisible['impact-stats'] ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-4 bg-gradient-to-br from-teal-100 to-green-100 text-teal-600 rounded-2xl group-hover:from-teal-200 group-hover:to-green-200 transition-all duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">{stat.number}</div>
                <div className="text-slate-600 font-medium text-sm leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How You Can Get Involved - Split by Audience */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Be Part of the Solution
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Whether you're a student, educator, partner, or supporter – there's a place for you in this movement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {getInvolvedOptions.map((option, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                    <div className="text-green-600">
                      {option.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">{option.title}</h3>
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">{option.description}</p>
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  {option.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* About the Organization - Founding Story */}
<section className="py-20 bg-white">
  <div className="max-w-7xl mx-auto px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-8">
          Why We Started Kedi Labs
        </h2>
        <div className="space-y-6">
          <p className="text-lg text-slate-600 leading-relaxed">
            Kenya produces extraordinary STEM talent, yet too often that talent stalls at the edge of the job market. The disconnect isn’t intelligence—it’s access. Students graduate with theory, but without the practical exposure that drives employability and innovation.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Kedi Labs was founded to change this trajectory. We saw the structural gap and chose to intervene: creating an ecosystem where every student, regardless of geography or institutional privilege, can engage with industry-grade tools, labs, and mentorship.
          </p>
          <p className="text-lg text-slate-600 leading-relaxed">
            Our mission is capacity-building at scale. By aligning education with the demands of a digital economy, we aim to transform untapped potential into the next generation of innovators and problem-solvers for Kenya and beyond.
          </p>
         
           <button 
    onClick={() => navigate('/about')}
    className="group  hover:border-emerald-400 text-emerald-400   px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center backdrop-blur-sm bg-[#131c2f] hover:bg-[#131c2f]/90"
  >
    Our Story
    <ChevronRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-400" />
  </button>
        
        </div>
      </div>
      <div>
   <img 
          src="https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0NhEujm7G60XZqtR25T9YSCuBbgIeFoiHafjm"
          alt="Kedi Labs vitual lab in use"
          className="w-full rounded-2xl shadow-2xl"
        /> 
      </div>
    </div>
  </div>
</section>


      {/* Call to Action - Conversion Section */}
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
                Join the Movement Today
              </span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-light mb-8 leading-tight">
              Be Part of Kenya's STEM Revolution
            </h2>
            <p className="text-xl text-gray-200 mb-12 leading-relaxed max-w-4xl mx-auto">
              Every day we wait, more brilliant minds graduate without the skills they need to change the world. The time to act is now. Join us in democratizing access to world-class STEM education across Kenya.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button 
                onClick={() => navigate('/programs')}
                className="bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-xl font-semibold text-lg transition-colors duration-200 flex items-center justify-center"
              >
                Get Involved Now
                <ArrowRight className="ml-3 h-6 w-6" />
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="border-2 border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-12 py-5 rounded-xl font-semibold text-lg transition-colors duration-200"
              >
                Support Our Mission
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

export default KediLabsHomepage;