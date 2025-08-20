import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import { Component, useEffect, useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';
import Home from '@pages/Home';
import About from '@pages/About';
import Programs from '@pages/Programs';
import Partners from '@pages/Partners';
import Blog from '@pages/Blog';
import DigitalTransformation from '@pages/DigitalTransformation';
import Contact from '@pages/Contact';
import './index.css';

class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          
        </div>
      );
    }
    return this.props.children;
  }
}

// Minimal Scientific 404 Not Found Component
const NotFound = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Generate minimal star field
    const newStars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Minimal star field */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white opacity-60"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl font-light text-white mb-8 tracking-wider">
            404
          </h1>
          
          <p className="text-gray-400 text-lg mb-12 font-light">
This page doesn't exist — maybe it's lost in hyperspace or was never here at all.
          </p>

          <div className="space-y-4">
            <a 
              href="/"
              className="block mx-auto px-6 py-2 border border-gray-600 text-gray-300 hover:border-white hover:text-white transition-colors duration-300 text-sm tracking-wide"
            >
              HOME
            </a>
            
            <button 
              onClick={() => window.history.back()}
              className="block mx-auto text-gray-500 hover:text-gray-300 transition-colors duration-300 text-sm tracking-wide bg-transparent border-none cursor-pointer"
            >
              CRUISE BACK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component to handle hash navigation and scroll restoration
const HashScrollHandler = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation on route change or page load
    const handleHashNavigation = () => {
      const hash = location.hash;
      if (hash) {
        // Small delay to ensure the page has rendered
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      } else {
        // Scroll to top on route change, but not on initial load
        if (location.pathname !== '/' || !window.location.hash) {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };

    handleHashNavigation();
  }, [location]);

  // Handle browser back/forward with hash
  useEffect(() => {
    const handlePopState = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ 
              behavior: 'smooth',
              block: 'start'
            });
          }
        }, 100);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return null;
};

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <HashScrollHandler />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/digital-transformation" element={<DigitalTransformation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog/category/education" element={<Blog />} />
              <Route path="/blog/category/technology" element={<Blog />} />
              <Route path="/blog/category/partnerships" element={<Blog />} />
              <Route path="/blog/category/research" element={<Blog />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </Router>
  );
}

export default App;