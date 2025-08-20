function ValueProposition() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Why Kedi Labs?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="p-6 bg-kedi-gray text-white rounded">
            <h3 className="text-xl font-bold mb-4">Innovative Learning Ecosystem</h3>
            <p>Transform traditional STEM education through immersive digital experiences that combine theoretical knowledge with practical application.</p>
          </div>
          <div className="p-6 bg-kedi-gray text-white rounded">
            <h3 className="text-xl font-bold mb-4">Culturally Relevant Content</h3>
            <p>Our curriculum is designed by African educators for African students, incorporating local contexts and challenges.</p>
          </div>
          <div className="p-6 bg-kedi-gray text-white rounded">
            <h3 className="text-xl font-bold mb-4">Sustainable Impact</h3>
            <p>Every program is designed with environmental consciousness, teaching students to innovate solutions for sustainability.</p>
          </div>
          <div className="p-6 bg-kedi-gray text-white rounded">
            <h3 className="text-xl font-bold mb-4">Multi-Stakeholder Collaboration</h3>
            <p>We bring together educators, industry experts, and institutions to create a comprehensive support system.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ValueProposition;