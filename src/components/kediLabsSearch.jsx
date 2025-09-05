import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, ExternalLink } from 'lucide-react';

const KediLabsSearch = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef(null);

  // Enhanced search database with homepage content
const searchDatabase = [
  // Homepage content
  {
    id: 'home',
    title: 'Kedi Labs - Building Kenya\'s STEM Future',
    description: 'Laying the foundation for a STEM Tech Hub where innovation, entrepreneurship, and research converge to fuel Africa\'s digital economy.',
    url: '/',
    keywords: ['home', 'kedi labs', 'stem tech hub', 'innovation', 'entrepreneurship', 'digital economy', 'africa', 'kenya', 'foundation'],
    content: 'STEM technology start-up platform for innovation and research in Africa. Bridging Africa\'s STEM skills gap through policy advocacy, educator training, and virtual laboratory solutions. Making industry-ready STEM education accessible to all students in Kenya and beyond.'
  },
  {
    id: 'policy-advocacy',
    title: 'Policy & Advocacy for Digital Education',
    description: 'Pushing for national investment in digital-first STEM learning with policies that prioritize access to modern resources and future-ready education.',
    url: '/#policy',
    keywords: ['policy advocacy', 'digital education', 'national investment', 'digital-first learning', 'modern resources', 'future-ready education', 'government'],
    content: 'Strategic policy advocacy for digital education transformation in Kenya. Pushing for systemic change in how Africa approaches STEM education funding and resource allocation. Championing policies that prioritize access to modern resources, equitable opportunities, and future-ready education.'
  },
  {
    id: 'educator-training',
    title: 'Training, Tools & Access for Educators',
    description: 'Equipping STEM educators with digital teaching capacity and supplying Virtual Labs and Learning Toolkits for real-world skills.',
    url: '/#training',
    keywords: ['educator training', 'digital teaching', 'virtual labs', 'learning toolkits', 'real-world skills', 'stem educators', 'capacity building'],
    content: 'Comprehensive training programs for STEM educators with virtual laboratory tools. Equipping teachers with modern STEM teaching methods and industry-relevant skills they can pass to students. Comprehensive training and sensitization programs designed for STEM educators and students.'
  },
  {
    id: 'skills-gap',
    title: 'Bridging Kenya\'s STEM Skills Gap',
    description: 'Addressing the structural gap between classroom theory and industry reality to create job-ready graduates.',
    url: '/#mission',
    keywords: ['skills gap', 'structural gap', 'classroom theory', 'industry reality', 'job-ready graduates', 'employability', 'market alignment'],
    content: 'Solving the disconnect between education and industry demands in Kenya\'s STEM sector. Kenya produces thousands of STEM graduates each year, yet most remain underutilized. The missing link isn\'t talent—it\'s alignment between education and industry demands.'
  },
  {
    id: 'democratizing-stem',
    title: 'Democratizing STEM Excellence',
    description: 'Ensuring every Kenyan STEM student has access to industry-grade resources and real-world skills training.',
    url: '/#mission',
    keywords: ['democratizing stem', 'stem excellence', 'industry-grade resources', 'access', 'equal opportunity', 'stem students'],
    content: 'Movement to make quality STEM education accessible to all students in Kenya. Ensuring every brilliant mind deserves the chance to solve real-world problems. When we give students the same tools used by top companies worldwide, we unlock Africa\'s innovation potential.'
  },
  {
    id: 'virtual-laboratories',
    title: 'Virtual Laboratory Solutions',
    description: 'Professional-grade virtual labs providing hands-on STEM learning experiences without physical infrastructure limitations.',
    url: '/#virtual-labs',
    keywords: ['virtual labs', 'virtual laboratory', 'professional-grade tools', 'hands-on learning', 'stem experiments', 'digital labs'],
    content: 'Advanced virtual laboratory technology for immersive STEM education. Providing access to the same professional-grade tools and simulations used in top global companies. Deployment of virtual laboratory toolkits and comprehensive digital learning resources to schools.'
  },
  {
    id: 'impact-metrics',
    title: 'Our Strategic Impact Targets',
    description: '100+ educators trained, 15+ institutions with virtual labs, 500+ students transitioned to applied learning by 2028.',
    url: '/#impact',
    keywords: ['impact metrics', 'educators trained', 'institutions', 'applied learning', '2028 targets', 'strategic goals'],
    content: 'Measurable goals for transforming STEM education across Kenya. 100+ educators equipped with digital-first teaching capacity by 2028. 15+ institutions piloting our virtual lab infrastructure by 2028. 500+ students transitioned from theory to applied STEM learning by 2028.'
  },
  {
    id: 'get-involved',
    title: 'Be Part of Kenya\'s STEM Revolution',
    description: 'Join students, mentors, partners, and institutions in transforming STEM education. Multiple ways to contribute and make impact.',
    url: '/#get-involved',
    keywords: ['get involved', 'stem revolution', 'students', 'mentors', 'partners', 'institutions', 'volunteer', 'support'],
    content: 'Opportunities for students, educators, partners and supporters to join our mission. Students & Learners can join programs to gain real-world STEM skills. Volunteers & Mentors can share expertise with the next generation. Partners & Donors can support our mission to transform STEM education.'
  },
  
  // About page content
  {
    id: 'about-kedi',
    title: 'About Kedi Labs - Strategic STEM Education Transformation',
    description: 'Why we started Kedi Labs to change the trajectory of Kenya\'s STEM talent from theory to market-ready skills.',
    url: '/about',
    keywords: ['about', 'founding story', 'mission', 'vision', 'kenya stem talent', 'capacity building', 'trajectory change', 'strategic overview'],
    content: 'Our story of addressing the structural gap in Kenya\'s STEM education pipeline. Architecting Kenya\'s STEM Future. We are strategically positioned at the intersection of Kenya\'s digital transformation and STEM workforce development. Kenya\'s STEM education sector represents a $2.3B market opportunity. Strategic Market Position: Positioned at the intersection of Kenya\'s digital transformation and STEM workforce development. Scalable Impact Model: Technology-enabled approach allows exponential reach without proportional cost increases. Risk Mitigation Strategy: Diversified revenue streams across government partnerships, private institutions, and development finance.'
  },
  {
    id: 'about-mission',
    title: 'Kedi Labs Strategic Mission',
    description: 'Systematic transformation of Kenya\'s STEM education infrastructure through scalable technology solutions.',
    url: '/about#mission',
    keywords: ['strategic mission', 'stem transformation', 'scalable solutions', 'capacity building', 'employability'],
    content: 'To systematically transform Kenya\'s STEM education infrastructure through scalable technology solutions, strategic policy advocacy, and comprehensive capacity building—creating measurable improvements in graduate employability and national innovation capacity. Deploy virtual laboratories across 500+ institutions by 2028. Train 5,000+ educators in digital-first STEM pedagogy. Influence national policy for digital education investment.'
  },
  {
    id: 'about-vision',
    title: 'Kedi Labs Long-Term Vision',
    description: 'Establishing Kenya as the regional leader in STEM education excellence with industry-ready graduates.',
    url: '/about#vision',
    keywords: ['long-term vision', 'stem excellence', 'regional leader', 'industry-ready', 'innovation'],
    content: 'To establish Kenya as the regional leader in STEM education excellence, where every graduate possesses industry-ready skills, where innovation drives economic growth, and where our educational model becomes the blueprint for digital transformation across Kenya and beyond. 2030 Impact Target: By 2030, Kedi Labs graduates will represent 25% of Kenya\'s STEM workforce, with 90% employment rates within 6 months of graduation and average salaries 40% above national averages.'
  },
  {
    id: 'about-growth',
    title: 'Kedi Labs Growth Strategy',
    description: 'Phased expansion model balancing rapid growth with operational excellence across Kenya\'s educational landscape.',
    url: '/about#growth',
    keywords: ['growth strategy', 'expansion', 'scaling', 'operational excellence'],
    content: 'Our phased expansion model balances rapid growth with operational excellence, ensuring sustainable impact across Kenya\'s diverse educational landscape. Phase 1: Foundation (2021-2024) - Proof of Concept, Market Entry, Technology Platform. Phase 2: Scale (2025-2028) - Nationwide Expansion, Advanced Analytics, Regional Leadership expanding to Uganda, Tanzania, and Rwanda.'
  },

  // Programs page content
  {
    id: 'programs',
    title: 'STEM Programs & Solutions - Kedi Labs',
    description: 'Comprehensive programs including virtual labs, educator training, and policy advocacy to transform STEM education.',
    url: '/programs',
    keywords: ['programs', 'stem solutions', 'comprehensive training', 'transformation', 'educational programs'],
    content: 'Complete suite of STEM education transformation programs and services. Three strategic initiatives driving STEM education transformation across Kenya: Digital Education Policy Advocacy, STEM Educator Training & Sensitization, Virtual Labs & Digital Learning Toolkit Supply. KEDI Labs delivers comprehensive programs focused on advocacy, training, and access to advance STEM education across Kenya through strategic digitization initiatives.'
  },
  {
    id: 'program-advocacy',
    title: 'Digital Education Policy Advocacy Program',
    description: 'Strategic advocacy for digital education policy development and increased government investment in STEM Education infrastructure.',
    url: '/programs#advocacy',
    keywords: ['policy advocacy', 'government investment', 'stem infrastructure', 'digital policy'],
    content: 'Strategic advocacy for digital education policy development and increased government investment in STEM Education infrastructure across Kenya and East Africa. We work directly with government institutions and policymakers to create frameworks that support digital learning initiatives and ensure sustainable funding for educational technology programs. Immediate Priority focus on Policy & Investment.'
  },
  {
    id: 'program-training',
    title: 'STEM Educator Training & Sensitization Program',
    description: 'Comprehensive training programs for STEM educators focusing on digital learning technologies integration.',
    url: '/programs#training',
    keywords: ['educator training', 'teacher development', 'digital integration', 'professional development'],
    content: 'Comprehensive training and sensitization programs designed for STEM educators and students, focusing on effective integration of digital learning technologies. Our programs transform teaching methodologies through hands-on workshops, certification courses, and ongoing support systems that ensure educators can confidently deliver digital STEM education. Ongoing Implementation focus on Capacity Building.'
  },
  {
    id: 'program-labs',
    title: 'Virtual Labs & Digital Learning Toolkit Program',
    description: 'Deployment of virtual laboratory toolkits and digital resources to schools enabling hands-on STEM education.',
    url: '/programs#labs',
    keywords: ['virtual labs', 'digital toolkit', 'stem resources', 'hands-on learning'],
    content: 'Deployment of virtual laboratory toolkits and comprehensive digital learning resources to schools, enabling hands-on STEM education without physical infrastructure constraints. Our solution includes complete virtual laboratory environments, interactive simulations, and cross-platform tools that bring practical STEM learning to every classroom. Active Deployment focus on Access & Equity.'
  },

  // Contact page content
  {
    id: 'contact',
    title: 'Contact Kedi Labs - STEM Education & Careers in Kenya',
    description: 'Get in touch for partnerships, collaborations, funding opportunities, and joining our STEM community.',
    url: '/contact',
    keywords: ['contact', 'partnerships', 'collaborations', 'funding', 'community', 'get in touch', 'stem careers', 'women in stem'],
    content: 'Connect with us for various opportunities to support STEM education in Kenya. Join Kedi Labs to transform STEM education in Kenya. Connect to empower women in STEM, explore sustainable career pathways, or partner with national schools for digital learning. Contact options: General Inquiries, Technical Support, Partnerships, Office Location in Kisumu. Stakeholder types: Just Connect, Volunteer, Join Our Events, Funding/Investor.'
  },
  {
    id: 'contact-partnerships',
    title: 'Partnership Opportunities - Kedi Labs',
    description: 'Explore collaboration opportunities with Kedi Labs to advance STEM education in Africa.',
    url: '/contact#partnerships',
    keywords: ['partnerships', 'collaboration', 'corporate partners', 'institutional partners'],
    content: 'Explore partnership opportunities with Kedi Labs. We partner with four main categories: Educational Institutions (universities, technical colleges), Technology Partners (EdTech companies, hardware/software providers), Funding & Development Partners (foundations, government agencies), and Community & Implementation Partners (NGOs, local organizations).'
  },
  {
    id: 'contact-volunteer',
    title: 'Volunteer with Kedi Labs - STEM Education',
    description: 'Join African educators to empower women in STEM and shape career pathways through volunteering.',
    url: '/contact#volunteer',
    keywords: ['volunteer', 'mentor', 'women in stem', 'career pathways', 'african educators'],
    content: 'Join African educators to empower women in STEM and shape career pathways. Volunteer opportunities include sharing expertise with the next generation of STEM professionals. Areas of interest: STEM Education Kenya, Women in STEM, STEM Career Pathways, Curriculum Development, Sustainable Technology Training, Community Outreach, Research & Development, Event Organization.'
  },

  // Partners page content
  {
    id: 'partners',
    title: 'Kedi Labs Partners - Collaborating for STEM Education Impact',
    description: 'Join our network of 50+ partners including universities, EdTech companies, and NGOs driving STEM education impact in Kenya.',
    url: '/partners',
    keywords: ['partners', 'collaborations', 'edtech partners', 'educational institutions', 'impact partners'],
    content: 'Join Kedi Labs\' network of over 50 partners, including universities, EdTech companies, and NGOs, to drive STEM education impact in Kenya through virtual labs, educator training, and strategic collaborations. Partnership categories: Educational Institutions, Technology Partners, Funding & Development Partners, Community & Implementation Partners. Partnership benefits: Strategic Collaboration, Resource Sharing, Capacity Building, Network Access, Impact Measurement, Market Development.'
  },
  {
    id: 'partners-educational',
    title: 'Educational Institution Partnerships - Kedi Labs',
    description: 'Partner with universities and colleges to enhance STEM programs with digital learning solutions.',
    url: '/partners#educational',
    keywords: ['educational partners', 'universities', 'colleges', 'research institutions'],
    content: 'Universities, technical colleges, and research institutions across East Africa seeking to enhance their STEM programs with digital learning solutions. Partners include University of Nairobi, Makerere University, University of Dar es Salaam, Kigali Institute of Science and Technology, Technical University of Kenya, Addis Ababa University. Value propositions: Access to virtual laboratory infrastructure, Educator training and certification programs, Curriculum development support, Student placement opportunities.'
  },
  {
    id: 'partners-technology',
    title: 'Technology Partnerships - Kedi Labs',
    description: 'Collaborate with leading EdTech companies and technology providers to advance STEM education in Africa.',
    url: '/partners#technology',
    keywords: ['technology partners', 'edtech', 'software providers', 'hardware providers'],
    content: 'Leading EdTech companies, hardware/software providers, and digital platform developers committed to advancing STEM education in Africa. Partners include Microsoft Education, Google for Education, Cisco Networking Academy, Intel Education, Amazon Web Services, Siemens Digital Industries. Value propositions: Market access to educational institutions, Co-development of localized solutions, Pilot programs for new technologies, Brand visibility in growing STEM ecosystem.'
  },
  {
    id: 'partners-funding',
    title: 'Funding & Development Partnerships - Kedi Labs',
    description: 'Investment opportunities for development finance institutions and corporate sponsors in Africa\'s digital future.',
    url: '/partners#funding',
    keywords: ['funding partners', 'development finance', 'corporate sponsors', 'investment'],
    content: 'Development finance institutions, private foundations, government agencies, and corporate sponsors investing in Africa\'s digital future. Partners include World Bank Group, African Development Bank, Gates Foundation, Mastercard Foundation, USAID, UK Foreign Commonwealth Office. Value propositions: Measurable impact on STEM education metrics, Scalable solutions with sustainable models, Alignment with UN Sustainable Development Goals, Comprehensive reporting and transparency.'
  }
];

  // Simplified search algorithm
  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    
    setTimeout(() => {
      const searchTerms = query.toLowerCase().split(' ').filter(term => term.length > 0);
      
      const results = searchDatabase.map(item => {
        let score = 0;
        const itemText = `${item.title} ${item.description} ${item.content} ${item.keywords.join(' ')}`.toLowerCase();
        
        // Exact phrase matching
        if (itemText.includes(query.toLowerCase())) {
          score += 100;
        }
        
        // Title matching
        searchTerms.forEach(term => {
          if (item.title.toLowerCase().includes(term)) {
            score += 50;
          }
        });
        
        // Keywords matching
        searchTerms.forEach(term => {
          item.keywords.forEach(keyword => {
            if (keyword.includes(term)) {
              score += 30;
            }
          });
        });
        
        // Description matching
        searchTerms.forEach(term => {
          if (item.description.toLowerCase().includes(term)) {
            score += 20;
          }
        });
        
        return { ...item, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 6);
      
      setSearchResults(results);
      setIsSearching(false);
    }, 200);
  };

  useEffect(() => {
    performSearch(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeydown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, [onClose]);

  const handleResultClick = (item) => {
    if (item.url.startsWith('mailto:')) {
      window.location.href = item.url;
    } else {
      window.location.href = item.url;
    }
    onClose();
  };

  const highlightQuery = (text, query) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, 'gi'));
    return parts.map((part, i) => 
      part.toLowerCase() === query.toLowerCase() ? 
        <mark key={i} className="bg-yellow-200 text-yellow-800 rounded px-1">{part}</mark> : part
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
      <div 
        className="absolute inset-0"
        onClick={onClose}
      />
      
      {/* Search Panel - Sliding from right */}
      <div className="absolute top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl transform transition-transform duration-300 translate-x-0">
        
        {/* Search Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
          <div className="flex items-center p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800 mr-auto">Search Kedi Labs</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search programs, resources, contact..."
                className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-green-500 focus:ring-0 focus:outline-none transition-colors bg-gray-50"
              />
              {isSearching && (
                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-green-600 border-t-transparent"></div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Search Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!searchQuery && (
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-6">Quick Access</h3>
              <div className="space-y-3">
                {[
                  { title: 'STEM Programs', url: '/programs', desc: 'Virtual labs and educator training' },
                  { title: 'Get Involved', url: '/#get-involved', desc: 'Join our STEM community' },
                  { title: 'About Our Mission', url: '/about', desc: 'Why we started Kedi Labs' },
                  { title: 'Contact Us', url: '/contact', desc: 'Partnerships and support' }
                ].map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      window.location.href = link.url;
                      onClose();
                    }}
                    className="w-full text-left p-4 rounded-xl hover:bg-gray-50 transition-colors group border border-gray-100 hover:border-green-200"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-1">{link.title}</h4>
                        <p className="text-sm text-gray-600">{link.desc}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </button>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Virtual Labs', 'STEM Careers', 'Educator Training', 'Policy Advocacy'].map((term, index) => (
                    <button
                      key={index}
                      onClick={() => setSearchQuery(term)}
                      className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {searchQuery && searchResults.length === 0 && !isSearching && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">No results found</h3>
              <p className="text-gray-600">Try different keywords or browse our quick access links above.</p>
            </div>
          )}

          {searchResults.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} for "{searchQuery}"
              </h3>
              <div className="space-y-4">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="w-full text-left p-5 rounded-xl hover:bg-gray-50 transition-all duration-200 group border border-gray-100 hover:border-green-200 hover:shadow-sm"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0 pr-4">
                        <h4 className="font-semibold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
                          {highlightQuery(result.title, searchQuery)}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {highlightQuery(result.description, searchQuery)}
                        </p>
                        <div className="flex items-center text-xs text-green-600">
                          <span>{result.url}</span>
                          {result.url.startsWith('mailto:') && (
                            <ExternalLink className="h-3 w-3 ml-1" />
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
          <div className="text-xs text-gray-500 text-center">
            Press <kbd className="px-2 py-1 bg-gray-100 rounded">ESC</kbd> to close
          </div>
        </div>
      </div>
    </div>
  );
};

export default KediLabsSearch;