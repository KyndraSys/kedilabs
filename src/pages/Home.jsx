import React, { useState, useEffect } from 'react';
import { ChevronRight, Users, Award, Globe, Lightbulb, BookOpen, Megaphone, ArrowRight, Play, CheckCircle, Star, Zap, Shield, Cpu, Network, Eye, Settings, Microscope, GraduationCap, Cog, FlaskConical, Binary } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import NavigationPills from '../components/NavigationPills';

const KediLabsHomepage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState({});
  
  // Add useNavigate hook
  const navigate = useNavigate();

  const heroSlides = [
  {
    title: "Advocating for Digital STEM Education in Kenya",
    subtitle: "Driving policy change and investment in Kenya's STEM education sector, championing digital learning opportunities for schools, teachers, and students across the country.",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
  },
  {
    title: "Training STEM Educators & Students in Kenya",
    subtitle: "Equipping Kenyan educators and STEM learners with cutting-edge digital teaching skills, hands-on training, and sensitization programs that prepare the next generation of innovators.",
    image: "https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0iG0h3QLWHywEnTc0bSzVxR4KgXYaBIMudqjA"
  },
  {
    title: "Expanding Access with Virtual Labs & Toolkits",
    subtitle: "Delivering virtual science labs and digital learning toolkits to schools and institutions across Kenya, bridging the digital divide and unlocking world-class STEM education for all.",
    image: "https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0NhEujm7G60XZqtR25T9YSCuBbgIeFoiHafjm"
  }
];

  const impactStats = [
    { number: "1,000+", label: "Targeted trained STEM educators", icon: <Users className="h-8 w-8" /> },
    { number: "180+", label: "Targeted Schools equipped with virtual labs", icon: <GraduationCap className="h-8 w-8" /> },
    { number: "15,000+", label: "Targeted learnersto be impacted in Kenya", icon: <Globe className="h-8 w-8" /> },
    { number: "95%", label: "Training completion rate", icon: <Award className="h-8 w-8" /> }
  ];

  const valueProps = [
    {
      icon: <Cog className="h-12 w-12" />,
      title: "Digital Education Policy Advocacy",
      description: "Leading advocacy efforts for comprehensive digital education policy development and strategic investment in STEM education infrastructure across Kenya.",
      color: "from-[#008B8B] to-[#36454F]"
    },
    {
      icon: <Shield className="h-12 w-12" />,
      title: "STEM Educator Training Programs",
      description: "Comprehensive training and sensitization programs for STEM educators and students in Kenya and beypond.",
      color: "from-[#379504] to-[#008B8B]"
    },
    
    {
      icon: <FlaskConical className="h-12 w-12" />,
      title: "Virtual Labs & Digital Toolkit Supply",
      description: "Complete virtual laboratory toolkit supply and digital learning toolkit distribution to schools and educational institutions nationwide.",
      color: "from-[#FF6B35] to-[#008B8B]"
    }
  ];

  const technologyCategories = [
  {
    icon: <Megaphone className="h-16 w-16" />,
    title: "Policy Advocacy",
    description: "Championing digital education policy and driving investment in STEM across Kenya."
  },
  {
    icon: <GraduationCap className="h-16 w-16" />,
    title: "STEM Educator & Student Training",
    description: "Capacity-building programs that equip STEM educators and learners with essential digital skills."
  },
  {
    icon: <FlaskConical className="h-16 w-16" />,
    title: "Virtual Labs & Digital Toolkits",
    description: "Providing schools and institutions with accessible virtual laboratories and digital learning toolkits."
  }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
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

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-800/70 to-slate-900/90 z-10"></div>
        
        {/* Background Image Slider */}
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
                alt=""
                className="w-full h-full object-cover opacity-60"
              />
            </div>
          ))}
        </div>

        {/* Subtle geometric patterns */}
        <div className="absolute inset-0 opacity-10 z-15">
          <div className="absolute top-20 right-20 w-96 h-96 border border-cyan-400 rotate-45 rounded-3xl"></div>
          <div className="absolute bottom-32 left-32 w-72 h-72 border border-teal-400 rotate-12 rounded-2xl"></div>
          <div className="absolute top-1/2 right-1/3 w-48 h-48 border border-green-400 -rotate-12 rounded-xl"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex items-center h-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="mb-8 animate-fade-in">
                <span className="inline-flex items-center bg-slate-800/60 backdrop-blur-sm text-cyan-400 px-6 py-3 rounded-full text-sm font-semibold uppercase tracking-wider border border-cyan-400/30 shadow-lg">
                  <FlaskConical className="h-5 w-5 mr-3" />
                  Digital Education • Training • Virtual Labs
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-white mb-8 leading-tight animate-slide-up">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-slate-300 mb-12 leading-relaxed max-w-4xl font-light animate-slide-up delay-200">
                {heroSlides[currentSlide].subtitle}
              </p>
             <div className="flex flex-col sm:flex-row gap-6 animate-slide-up delay-400">
  <button 
    onClick={() => navigate('/programs')}
    className="group relative bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-xl hover:shadow-green-500/25 overflow-hidden"
  >
    <span className="relative z-10 flex items-center">
    Learn more about our programs
      <ArrowRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  </button>
  
  <button 
    onClick={() => navigate('/contact')}
    className="group border-2 border-slate-600 hover:border-emerald-400 text-slate-300 hover:text-white px-10 py-4 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center backdrop-blur-sm bg-slate-800/20 hover:bg-slate-700/30"
  >
    Inquire from us
    <ChevronRight className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-400" />
  </button>
</div>

            </div>
          </div>
        </div>

        <NavigationPills />

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-cyan-400' : 'bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Bottom Gradient Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-15"></div>
      </section>

      {/* Impact Stats */}
      <section id="impact-stats" className="py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 ${
            isVisible['impact-stats'] ? 'animate-fadeInUp' : 'opacity-0'
          }`}>
            {impactStats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-6">
                  <div className="p-5 bg-gradient-to-br from-teal-100 to-green-100 text-teal-600 rounded-2xl group-hover:from-teal-200 group-hover:to-green-200 transition-all duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl lg:text-5xl font-light text-slate-800 mb-4">{stat.number}</div>
                <div className="text-slate-600 font-medium text-lg leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Categories */}
      <section id="technology-categories" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Our Programs
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {technologyCategories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="bg-white border-2 border-gray-100 rounded-3xl p-8 text-center hover:border-green-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex justify-center mb-6">
                    <div className="p-4 text-green-500 group-hover:text-green-600 transition-colors">
                      {category.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-green-600 transition-colors">
                    {category.title}
                  </h3>
                  <p className="text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center space-x-4">
            <button 
              onClick={() => navigate('/programs')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              View all programs
            </button>
            <button 
              onClick={() => navigate('/about')}
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              Why Kedi Labs for the digital era
            </button>
          </div>
        </div>
      </section>

      {/* Welcoming Partners Section */}
      <section id="welcoming-partners" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
              Welcoming Partners
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Join our mission to transform STEM education across Kenya
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Higher Education</h3>
              <p className="text-gray-600">Partner with universities and colleges</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Globe className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Development Partners</h3>
              <p className="text-gray-600">Collaborate with donors and NGOs</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Government</h3>
              <p className="text-gray-600">Work with Ministry of Education</p>
            </div>

            <div className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lightbulb className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Innovation Community</h3>
              <p className="text-gray-600">Connect with tech innovators</p>
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 mr-4"
            >
              Become a Partner
            </button>
            <button 
              onClick={() => navigate('/partners')}
              className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
            >
              View Partnership Options
            </button>
          </div>
        </div>
      </section>

     
      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23008B8B' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-1/2 mb-12 lg:mb-0">
              <div className="mb-6">
                <span className="bg-green-600/20 text-green-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider border border-green-600/30">
                  Partner with Excellence
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-light mb-8 leading-tight">
                Transform Your School with Kedi Labs
              </h2>
              <p className="text-xl text-gray-200 mb-12 leading-relaxed">
                Only Kedi Labs integrates virtual laboratory solutions with comprehensive educator training, digital learning toolkit supply, and policy advocacy to drive STEM education transformation across Kenya.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/contact')}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-colors duration-200"
                >
                  Request training program demo
                </button>
                <button 
                  onClick={() => navigate('/programs')}
                  className="text-teal-400 hover:text-teal-300 px-8 py-4 font-medium transition-colors duration-200 flex items-center group"
                >
                  Explore virtual labs solutions
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 lg:pl-16">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="STEM Innovation"
                  className="w-full rounded-2xl shadow-2xl"
                />
              </div>
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