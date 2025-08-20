
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronRight, 
  ArrowRight, 
  Calendar,
  User,
  Tag,
  Search,
  Filter,
  BookOpen,
  Cpu,
  Microscope,
  Cog,
  Globe,
  TrendingUp,
  Users,
  Award,
  ExternalLink,
  Clock
} from 'lucide-react';

const Blog = () => {

  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState(null);
  const [isVisible, setIsVisible] = useState({});
  const categories = [
    { id: 'all', name: 'All Articles', count: 1 },
    { id: 'engineering', name: 'Engineering Education', count: 1 },
    { id: 'sustainability', name: 'Sustainability', count: 0 },
    { id: 'innovation', name: 'African Innovation', count: 0 },
    { id: 'partnerships', name: 'Partnerships', count: 0 },
    { id: 'insights', name: 'Industry Insights', count: 0 }
  ];

  const featuredPost = {
    id: 1,
    title: 'Transforming Engineering Education Through Digital Innovation',
    excerpt: 'How AI-powered learning platforms are revolutionizing STEM education across African universities and creating unprecedented access to quality engineering programs.',
    category: 'Engineering Education',
    author: 'Kedi Team',
    date: '2025-07-20',
    readTime: '8 min read',
    image: '/api/placeholder/600/400',
    featured: true,
    tags: ['AI', 'Engineering', 'Education Technology']
  };

  const stats = [
    { number: '50,000+', label: 'Engineering students reached', icon: Users },
    { number: '200+', label: 'Technical institutions partnered', icon: Award },
    { number: '15', label: 'Countries with active programs', icon: Globe },
    { number: '98%', label: 'Institutional partnership retention', icon: TrendingUp }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Narrow with Background Image */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 to-slate-800 overflow-hidden">
        {/* Background Cover Image */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-green-900/90 to-slate-900/90"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='600' viewBox='0 0 1200 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='lab-pattern' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='50' cy='50' r='2' fill='%23ffffff' fill-opacity='0.1'/%3E%3Cpath d='M50 20v60M20 50h60' stroke='%23ffffff' stroke-width='0.5' stroke-opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='1200' height='600' fill='url(%23lab-pattern)'/%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Breadcrumb */}
        <div className="relative z-20 mb-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center text-sm text-slate-400">
              <Link to="/" className="hover:text-cyan-400 transition-colors">Home</Link>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-cyan-400 font-medium">Blog</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="flex items-center mb-4">
                <div className="flex items-center text-cyan-400 text-sm font-medium">
                  <BookOpen className="h-4 w-4 mr-2" />
                  STEM Education • Innovation • Insights
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                Engineering{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-green-400 font-normal">
                  Innovation
                </span>{' '}
                Insights
              </h1>
              
              <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                Discover the latest breakthroughs in STEM education, sustainability innovations, and African engineering excellence. Stay informed with insights from industry leaders and academic pioneers.
              </p>

              <div className="flex items-center space-x-4">
                <Link to="/blog/digital-transformation" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors flex items-center group">
                  Explore Articles
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link to="/contact" className="border border-slate-600 hover:border-slate-500 text-slate-300 hover:text-white px-6 py-3 rounded-md font-medium transition-colors">
                  Subscribe to Updates
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-1 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                    activeCategory === category.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              Featured News Article
            </h2>
            <p className="text-lg text-gray-600">
              Latest news on programs from our engineering education research and innovation initiatives
            </p>
          </div>

          <div className="max-w-4xl mx-auto mb-16">
            <article className="group cursor-pointer">
              <Link to="/blog/digital-transformation">
                <div className="bg-gray-100 rounded-lg aspect-video mb-6 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <Microscope className="h-16 w-16 mx-auto mb-4 opacity-80" />
                      <p className="text-sm opacity-80">Featured Article Image</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 space-x-4">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-medium text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <User className="h-4 w-4 mr-1" />
                      {featuredPost.author}
                    </div>
                    
                    <div className="flex items-center text-green-600 text-sm font-medium group-hover:text-green-700">
                      Read Article
                      <ArrowRight className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          </div>
        </div>
      </section>

      {/* All Articles */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              All Articles
            </h2>
            <p className="text-lg text-gray-600">
              Explore our comprehensive collection of STEM education insights and innovations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <article className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group cursor-pointer">
              <Link to="/blog/digital-transformation">
                <div className="bg-gray-100 aspect-video overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-green-500 to-cyan-600 flex items-center justify-center">
                    <div className="text-center text-white">
                      <BookOpen className="h-12 w-12 mx-auto mb-2 opacity-60" />
                      <p className="text-xs opacity-60">Article Image</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div className="flex items-center text-xs text-gray-600 space-x-3">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-medium">
                      {featuredPost.category}
                    </span>
                    <div className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {new Date(featuredPost.date).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-green-600 transition-colors leading-tight">
                    {featuredPost.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center text-xs text-gray-600">
                      <User className="h-3 w-3 mr-1" />
                      {featuredPost.author}
                    </div>
                    
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {featuredPost.tags.map((tag) => (
                      <span key={tag} className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </article>
          </div>

          {/* Load More - Hidden for now since we only have one article */}
          <div className="text-center mt-12">
            <p className="text-gray-500 text-sm">More articles coming soon...</p>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-green-600" />
          </div>
          
          <h2 className="text-3xl font-normal text-gray-900 mb-6">
            Stay Updated with STEM Innovation
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Get the latest insights on our programs as partner, donor, or volunteer.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
           
            <Link 
              to="/contact"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap text-center"
            >
              Contact Form
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-4">
            Join 5,000+ educators and innovators.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Blog;