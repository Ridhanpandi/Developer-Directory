import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDeveloper, deleteDeveloper } from '../services/api';

function DeveloperProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [developer, setDeveloper] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await getDeveloper(id);
        setDeveloper(response.data);
      } catch (error) {
        toast.error('Failed to load developer profile');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id, navigate]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this developer?')) {
      try {
        await deleteDeveloper(id);
        toast.success('Developer deleted successfully');
        navigate('/');
      } catch (error) {
        toast.error('Failed to delete developer');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!developer) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">Developer not found</p>
      </div>
    );
  }

  const roleColors = {
    'Frontend': 'from-yellow-600 to-orange-600',
    'Backend': 'from-blue-600 to-cyan-600',
    'Full-Stack': 'from-green-600 to-emerald-600'
  };

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <button
          onClick={() => navigate('/')}
          className="mb-6 px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
        >
          ← Back to Directory
        </button>

        <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
          <div className="flex items-start gap-6 mb-8">
            <div className={`w-24 h-24 rounded-full flex items-center justify-center text-white font-bold text-3xl flex-shrink-0 bg-gradient-to-br ${roleColors[developer.role]}`}>
              {getInitials(developer.name)}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold text-slate-100 mb-2">{developer.name}</h1>
              <span className="inline-block px-4 py-2 rounded-full text-sm font-semibold bg-purple-600/20 text-purple-300 border border-purple-500/40">
                {developer.role}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-slate-400 text-sm mb-1">Experience</p>
              <p className="text-2xl font-bold text-slate-100">{developer.experience} years</p>
            </div>
            <div>
              <p className="text-slate-400 text-sm mb-1">Joined</p>
              <p className="text-slate-100">{new Date(developer.joining_date).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-slate-100 mb-4">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {developer.tech_stack.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-slate-700/50 text-slate-200 rounded-full text-sm border border-slate-600/50">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {developer.description && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-100 mb-4">About</h2>
              <p className="text-slate-300 leading-relaxed">{developer.description}</p>
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => navigate(`/edit/${id}`)}
              className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeveloperProfilePage;
