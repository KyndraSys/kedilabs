import { Link } from 'react-router-dom';

function ProgramCard({ title, description, link }) {
  return (
    <div className="p-6 bg-kedi-gray text-white rounded hover:shadow-lg">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="mb-4">{description}</p>
      <Link to={link} className="bg-kedi-orange text-white px-4 py-2 rounded hover:bg-opacity-90">
        Learn More
      </Link>
    </div>
  );
}

export default ProgramCard;