import React, { useState } from 'react';
import { 
  ChevronRight, 
  ArrowRight, 
  Calendar,
  User,
  Tag,
  Share2,
  BookOpen,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  ChevronLeft,
  X,
  Download,
  ExternalLink,
  Lightbulb,
  Users,
  Award,
  Globe
} from 'lucide-react';

const BlogDetail = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);

  const article = {
    title: "Transforming Engineering Education Through Digital Innovation",
    excerpt: "How AI-powered learning platforms are revolutionizing STEM education across African universities and creating unprecedented access to quality engineering programs.",
    category: "Engineering Education",
    author: "Dr. Sarah Kimani",
    authorTitle: "Director of Educational Innovation, Kedi Labs",
    date: "2025-07-20",
    readTime: "8 min read",
    views: "2,847",
    likes: "184",
    comments: "23",
    tags: ["AI", "Engineering", "Education Technology", "Digital Learning", "African Innovation"]
  };

  const galleryImages = [
    {
      id: 1,
      title: "AI-Powered Learning Laboratory",
      description: "Students engaging with interactive AI learning systems at University of Nairobi",
      category: "Laboratory",
      location: "University of Nairobi, Kenya"
    },
    {
      id: 2,
      title: "Digital Engineering Workshop",
      description: "Collaborative engineering design session using advanced simulation tools",
      category: "Workshop",
      location: "Technical University of Kenya"
    },
    {
      id: 3,
      title: "STEM Innovation Hub",
      description: "Modern innovation space equipped with cutting-edge engineering tools",
      category: "Infrastructure",
      location: "Makerere University, Uganda"
    },
    {
      id: 4,
      title: "Student Project Showcase",
      description: "Engineering students presenting their AI-assisted design projects",
      category: "Projects",
      location: "Kigali Institute of Science and Technology"
    },
    {
      id: 5,
      title: "Faculty Training Program",
      description: "Educators learning to integrate digital tools into STEM curriculum",
      category: "Training",
      location: "University of Dar es Salaam, Tanzania"
    },
    {
      id: 6,
      title: "Collaborative Research Space",
      description: "Inter-university research collaboration on sustainable engineering solutions",
      category: "Research",
      location: "Addis Ababa University, Ethiopia"
    }
  ];

  const relatedArticles = [
    {
      id: 1,
      title: "Sustainable Infrastructure for Digital Learning",
      category: "Sustainability",
      readTime: "6 min read",
      author: "Michael Ochieng"
    },
    {
      id: 2,
      title: "Partnership Models That Drive Innovation",
      category: "Partnerships",
      readTime: "5 min read",
      author: "Prof. James Mwangi"
    },
    {
      id: 3,
      title: "The Rise of Engineering Labs in East Africa",
      category: "Innovation",
      readTime: "7 min read",
      author: "Dr. Grace Wanjiku"
    }
  ];

  const openLightbox = (index) => {
    setCurrentGalleryIndex(index);
    setSelectedImage(galleryImages[index]);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const nextIndex = (currentGalleryIndex + 1) % galleryImages.length;
    setCurrentGalleryIndex(nextIndex);
    setSelectedImage(galleryImages[nextIndex]);
  };

  const prevImage = () => {
    const prevIndex = currentGalleryIndex === 0 ? galleryImages.length - 1 : currentGalleryIndex - 1;
    setCurrentGalleryIndex(prevIndex);
    setSelectedImage(galleryImages[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-r from-slate-900 to-slate-800">
        {/* Background Pattern */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 to-slate-900/90"></div>
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='1200' height='400' viewBox='0 0 1200 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='article-pattern' x='0' y='0' width='50' height='50' patternUnits='userSpaceOnUse'%3E%3Ccircle cx='25' cy='25' r='1' fill='%23ffffff' fill-opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='1200' height='400' fill='url(%23article-pattern)'/%3E%3C/svg%3E")`
            }}
          ></div>
        </div>

        {/* Breadcrumb */}
        <div className="relative z-20 mb-8">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="flex items-center text-sm text-slate-400">
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Home</span>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="hover:text-cyan-400 transition-colors cursor-pointer">Blog</span>
              <ChevronRight className="h-4 w-4 mx-2" />
              <span className="text-cyan-400 font-medium">Article</span>
            </div>
          </div>
        </div>

        {/* Article Header */}
        <div className="relative z-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="mb-6">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm font-medium">
                {article.category}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light text-white mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span className="text-white font-medium">{article.author}</span>
                <span className="ml-2">{article.authorTitle}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {new Date(article.date).toLocaleDateString()}
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {article.readTime}
              </div>
              <div className="flex items-center">
                <Eye className="h-4 w-4 mr-1" />
                {article.views} views
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Featured Image */}
              <div className="mb-12">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-lg aspect-video mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-white">
                    <div className="text-center">
                      <Lightbulb className="h-20 w-20 mx-auto mb-4 opacity-80" />
                      <p className="text-lg font-medium">AI-Powered Learning Innovation</p>
                      <p className="text-sm opacity-80">Digital transformation in African universities</p>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-gray-600 italic">
                  Students at University of Nairobi engaging with AI-powered engineering education platforms
                </p>
              </div>

              {/* Article Text */}
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-700 leading-relaxed mb-6">
                  The landscape of engineering education across Africa is undergoing a revolutionary transformation. 
                  Through the strategic implementation of artificial intelligence and digital learning platforms, 
                  universities are breaking down traditional barriers and creating unprecedented access to quality STEM education.
                </p>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-10">
                  The Digital Revolution in STEM Learning
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  At Kedi Labs, we've witnessed firsthand how digital innovation is reshaping the educational experience. 
                  Our AI-powered learning platforms have been deployed across 15 countries, reaching over 50,000 engineering students 
                  and transforming traditional classroom dynamics into interactive, personalized learning environments.
                </p>

                {/* Inline Image */}
                <div className="my-10">
                  <div className="bg-gradient-to-br from-green-500 to-blue-600 rounded-lg aspect-video mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Users className="h-16 w-16 mx-auto mb-3 opacity-80" />
                        <p className="text-lg font-medium">Collaborative Learning Environment</p>
                        <p className="text-sm opacity-80">Interactive STEM workshops and labs</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    Digital engineering workshop at Technical University of Kenya showcasing collaborative problem-solving
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-10">
                  Key Innovation Areas
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Our approach focuses on three critical areas that are driving measurable improvements in engineering education outcomes:
                </p>

                <div className="bg-gray-50 border-l-4 border-blue-600 p-6 my-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Adaptive Learning Systems</h3>
                  <p className="text-gray-700">
                    AI algorithms that adapt to individual learning styles and pace, ensuring that every student 
                    receives personalized instruction tailored to their specific needs and capabilities.
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-green-600 p-6 my-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Virtual Laboratory Environments</h3>
                  <p className="text-gray-700">
                    Immersive digital labs that provide hands-on experience with expensive equipment and complex 
                    simulations, making advanced engineering concepts accessible to all students regardless of resource constraints.
                  </p>
                </div>

                <div className="bg-gray-50 border-l-4 border-purple-600 p-6 my-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Real-time Assessment and Feedback</h3>
                  <p className="text-gray-700">
                    Continuous evaluation systems that provide immediate feedback, helping students identify knowledge 
                    gaps and enabling instructors to adjust their teaching strategies in real-time.
                  </p>
                </div>

                {/* Another Inline Image */}
                <div className="my-10">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg aspect-video mb-4 overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Award className="h-16 w-16 mx-auto mb-3 opacity-80" />
                        <p className="text-lg font-medium">Excellence in Innovation</p>
                        <p className="text-sm opacity-80">Award-winning educational solutions</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    Recognition ceremony for outstanding student projects at Kigali Institute of Science and Technology
                  </p>
                </div>

                <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-10">
                  Measurable Impact and Future Outlook
                </h2>

                <p className="text-gray-700 leading-relaxed mb-6">
                  The results speak for themselves. Universities implementing our digital learning platforms have reported 
                  a 40% improvement in student engagement, 35% increase in course completion rates, and 50% better 
                  performance in practical assessments. These metrics demonstrate the transformative power of technology 
                  when thoughtfully integrated into educational frameworks.
                </p>

                <p className="text-gray-700 leading-relaxed mb-6">
                  Looking ahead, we envision a future where geographical and economic barriers no longer limit access 
                  to world-class engineering education. Through continued innovation and strategic partnerships, 
                  we're building the foundation for Africa's next generation of engineers and innovators.
                </p>
              </div>

              {/* Article Footer */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2 mb-6">
                  {article.tags.map((tag) => (
                    <span key={tag} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm font-medium">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-red-500 transition-colors">
                      <Heart className="h-4 w-4 mr-1" />
                      {article.likes}
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-blue-500 transition-colors">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {article.comments}
                    </button>
                    <button className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                      <Share2 className="h-4 w-4 mr-1" />
                      Share
                    </button>
                  </div>
                  
                  <button className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                    <Download className="h-4 w-4 mr-1" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-8">
                {/* Author Bio */}
                <div className="bg-gray-50 p-6 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <User className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    {article.author}
                  </h3>
                  <p className="text-sm text-gray-600 text-center mb-4">
                    {article.authorTitle}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    Leading researcher in educational technology and AI applications in STEM education 
                    with over 15 years of experience in African university systems.
                  </p>
                </div>

                {/* Related Articles */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Articles</h3>
                  <div className="space-y-4">
                    {relatedArticles.map((related) => (
                      <div key={related.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <h4 className="font-medium text-gray-900 hover:text-blue-600 cursor-pointer mb-2 leading-tight">
                          {related.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-600 space-x-2">
                          <span className="bg-gray-100 px-2 py-1 rounded">{related.category}</span>
                          <span>{related.readTime}</span>
                          <span>by {related.author}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-normal text-gray-900 mb-4">
              Project Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Explore our STEM education initiatives and innovation projects across African universities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="group cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-video bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center text-white">
                    <div className="text-center transform group-hover:scale-110 transition-transform duration-300">
                      <Globe className="h-12 w-12 mx-auto mb-2 opacity-80" />
                      <p className="text-sm font-medium opacity-90">{image.category}</p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ExternalLink className="h-4 w-4 text-white" />
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {image.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {image.description}
                  </p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Tag className="h-3 w-3 mr-1" />
                    {image.location}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            
            {/* Navigation Buttons */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="h-8 w-8" />
            </button>
            
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="h-8 w-8" />
            </button>

            {/* Image Container */}
            <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-lg aspect-video mb-4 overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-white">
                <div className="text-center">
                  <Globe className="h-24 w-24 mx-auto mb-4 opacity-80" />
                  <p className="text-xl font-medium">{selectedImage.title}</p>
                  <p className="text-sm opacity-80 mt-2">{selectedImage.category}</p>
                </div>
              </div>
            </div>
            
            {/* Image Info */}
            <div className="text-white text-center">
              <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
              <p className="text-gray-300 mb-2">{selectedImage.description}</p>
              <p className="text-gray-400 text-sm">{selectedImage.location}</p>
            </div>
            
            {/* Image Counter */}
            <div className="text-center text-gray-400 text-sm mt-4">
              {currentGalleryIndex + 1} of {galleryImages.length}
            </div>
          </div>
        </div>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 bg-white border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          
          <h2 className="text-3xl font-normal text-gray-900 mb-6">
            Stay Updated with STEM Innovation
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Get the latest insights on engineering education and African innovation delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetail;