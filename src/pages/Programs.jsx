import React from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';

const KediLabsPrograms = () => {
  const corePrograms = [
    {
      id: 'advocacy',
      title: 'Digital Education Policy Advocacy',
      subtitle: 'Advancing STEM Education Investment',
      description: 'Strategic advocacy for digital education policy development and increased government investment in STEM Education infrastructure across Kenya and East Africa. We work directly with government institutions and policymakers to create frameworks that support digital learning initiatives and ensure sustainable funding for educational technology programs.',
      image: 'https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ050eANcVhIFogcmNvK19QBbOS4yLjX6sE2MC8?w=800&h=600&fit=crop&crop=center',
      timeline: 'Immediate Priority',
      focus: 'Policy & Investment'
    },
    {
      id: 'training',
      title: 'STEM Educator Training & Sensitization',
      subtitle: 'Building Digital Teaching Capacity',
      description: 'Comprehensive training and sensitization programs designed for STEM educators and students, focusing on effective integration of digital learning technologies. Our programs transform teaching methodologies through hands-on workshops, certification courses, and ongoing support systems that ensure educators can confidently deliver digital STEM education.',
      image: 'https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0bfAzE4DvoSM1AOeWtnm8j2Rr7gap6KuwUlVD?w=800&h=600&fit=crop&crop=center',
      timeline: 'Ongoing Implementation',
      focus: 'Capacity Building'
    },
    {
      id: 'access',
      title: 'Virtual Labs & Digital Learning Toolkit Supply',
      subtitle: 'Expanding Access to STEM Resources',
      description: 'Deployment of virtual laboratory toolkits and comprehensive digital learning resources to schools, enabling hands-on STEM education without physical infrastructure constraints. Our solution includes complete virtual laboratory environments, interactive simulations, and cross-platform tools that bring practical STEM learning to every classroom.',
      image: 'https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0NhEujm7G60XZqtR25T9YSCuBbgIeFoiHafjm?w=800&h=600&fit=crop&crop=center',
      timeline: 'Active Deployment',
      focus: 'Access & Equity'
    }
  ];

  const impactMetrics = [
    { value: '1,000+', label: 'STEM Educators Targeted' },
    { value: '180+', label: 'Schools for Virtual Labs' },
    { value: '15,000+', label: 'Students to be Impacted' },
    { value: '5+', label: 'Counties in Kenya' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-green-600 transition-colors">Home</a>
            <ChevronRight className="h-4 w-4 mx-2" />
            <span className="text-green-600 font-medium">Programs</span>
          </div>
        </div>
      </div>

     {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-green-900 overflow-hidden">
        {/* Floating network elements like Cisco */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Network lines */}
          <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 600">
            <path d="M200,100 Q400,50 600,150 T1000,200" stroke="white" strokeWidth="1" fill="none"/>
            <path d="M100,300 Q300,250 500,350 T900,400" stroke="rgba(34,197,94,0.3)" strokeWidth="1" fill="none"/>
            <circle cx="200" cy="100" r="4" fill="white"/>
            <circle cx="600" cy="150" r="4" fill="rgba(34,197,94,0.5)"/>
            <circle cx="1000" cy="200" r="4" fill="rgba(6,182,212,0.5)"/>
            <circle cx="100" cy="300" r="4" fill="white"/>
            <circle cx="500" cy="350" r="4" fill="rgba(34,197,94,0.5)"/>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-7xl font-light text-white mb-6 leading-tight">
              Our Programs
            </h1>
            
            <p className="text-2xl text-gray-300 mb-0 leading-relaxed">
              KEDI Labs delivers comprehensive programs focused on advocacy, training, and access to advance STEM education across Kenya through strategic digitization initiatives.
            </p>
          </div>
        </div>
      </section>
      {/* Core Programs */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Our Core Programs
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three strategic initiatives driving STEM education transformation across Kenya
            </p>
          </div>

          <div className="space-y-32">
            {corePrograms.map((program, index) => {
              const isEven = index % 2 === 0;
              
              return (
                <div key={program.id} className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  {/* Image Side */}
                  <div className={`${isEven ? 'order-1' : 'order-2'}`}>
                    <div className="relative">
                      <img 
                        src={program.image}
                        alt={program.title}
                        className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
                      />
                      <div className="absolute top-6 left-6">
                        <span className="bg-white/90 backdrop-blur-sm text-green-600 px-4 py-2 rounded-full text-sm font-medium shadow-lg">
                          {program.timeline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content Side */}
                  <div className={`${isEven ? 'order-2' : 'order-1'}`}>
                    <div className="mb-4">
                      <span className="text-sm text-green-600 font-medium">{program.focus}</span>
                      <h3 className="text-3xl font-light text-gray-900 mt-2">{program.title}</h3>
                      <p className="text-green-600 font-medium text-lg mt-1">{program.subtitle}</p>
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                      {program.description}
                    </p>

                    <a 
                      href="/contact"
                      className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 group shadow-lg hover:shadow-xl"
                    >
                      Learn More About This Program
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-light text-gray-900 mb-6">
              Projected Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Measurable outcomes driving STEM education transformation across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-5xl font-light text-gray-900 mb-3">
                  {metric.value}
                </div>
                <div className="text-gray-600 font-medium">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Vision */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img 
                src="https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0ib5bacKLWHywEnTc0bSzVxR4KgXYaBIMudqj?w=600&h=500&fit=crop&crop=center"
                alt="Strategic Vision"
                className="w-full h-[500px] object-cover rounded-2xl shadow-xl"
              />
            </div>

            <div>
              <h2 className="text-4xl font-light text-gray-900 mb-8">
                Our Strategic Vision
              </h2>
              
              <div className="space-y-8">
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Immediate Focus</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Digitization of education initiatives through advocacy, training, and access programs that directly impact STEM education delivery across Kenya.
                  </p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-6">
                  <h3 className="text-xl font-medium text-gray-900 mb-3">Long-term Vision</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Building a sustainable tech startup ecosystem that supports continuous innovation in educational technology solutions for Africa.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex space-x-4">
                <a 
                  href="/contact"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Partner With Us
                </a>
                <a
                  href='https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0CGt8GwEIFJjK2yWd6uQSYcGTq7vwV19CNOxh'
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-medium transition-all duration-300"
                >
                  Download Guide
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-green-600">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-light text-white mb-6">
            Ready to Transform STEM Education?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with Kenya Digital Laboratories to implement comprehensive STEM education solutions tailored for your institution's needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="/contact"
              className="bg-white hover:bg-gray-50 text-green-600 px-10 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group shadow-lg hover:shadow-xl"
            >
              Schedule Consultation
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
            
            <a
              href='https://hvaa0fgs9i.ufs.sh/f/dnBu1xMbtIQ0CGt8GwEIFJjK2yWd6uQSYcGTq7vwV19CNOxh'
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 px-10 py-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center group"
            >
              Partnership Guide
              <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KediLabsPrograms;