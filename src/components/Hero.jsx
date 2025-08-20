import { Link } from 'react-router-dom';

function Hero() {
  return (
    <section className="bg-kedi-teal text-white py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">Transforming STEM Education for Africa's Digital Future</h1>
        <p className="text-xl mb-8">Empowering the next generation of engineers, innovators, and problem-solvers through cutting-edge digital learning experiences rooted in sustainability and excellence.</p>
        <div className="space-x-4">
          <Link to="/programs" className="bg-kedi-orange text-white px-6 py-3 rounded hover:bg-opacity-90">Explore Our Programs</Link>
          <Link to="/partners" className="bg-kedi-green text-white px-6 py-3 rounded hover:bg-opacity-90">Partner With Us</Link>
          <Link to="/donate" className="bg-white text-kedi-teal px-6 py-3 rounded hover:bg-opacity-90">Support Innovation</Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;