import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDeveloper, updateDeveloper } from '../services/api';

const ROLES = ['Frontend', 'Backend', 'Full-Stack'];

function EditDeveloperPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchDeveloper = async () => {
      try {
        const response = await getDeveloper(id);
        const dev = response.data;
        setFormData({
          name: dev.name,
          role: dev.role,
          techStack: dev.tech_stack || [],
          experience: dev.experience,
          description: dev.description || ''
        });
      } catch (error) {
        toast.error('Failed to load developer');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    fetchDeveloper();
  }, [id, navigate]);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'Role is required';
    if (formData.techStack.length === 0) newErrors.techStack = 'Add at least one technology';
    if (formData.experience < 0 || formData.experience > 50) newErrors.experience = 'Experience must be 0-50 years';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleAddTech = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tech = e.target.value.trim();
      if (tech && !formData.techStack.includes(tech)) {
        setFormData(prev => ({ ...prev, techStack: [...prev.techStack, tech] }));
        e.target.value = '';
      }
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData(prev => ({ ...prev, techStack: prev.techStack.filter(t => t !== tech) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await updateDeveloper(id, formData);
      toast.success('Developer updated successfully!');
      navigate(`/profile/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update developer');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!formData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-slate-400">Developer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-10">
      <div className="container mx-auto px-4 max-w-2xl">
        <button
          onClick={() => navigate(`/profile/${id}`)}
          className="mb-6 px-4 py-2 text-slate-400 hover:text-slate-200 transition-colors"
        >
          ← Back to Profile
        </button>

        <div className="bg-slate-800/70 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8">
          <h1 className="text-3xl font-bold text-slate-100 mb-8">Edit Developer</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-slate-800/70 text-slate-100 transition-all ${errors.name ? 'border-red-500' : 'border-slate-700/50'}`}
              />
              {errors.name && <span className="text-xs text-red-400 mt-1">{errors.name}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className={`w-full px-4 py-3 border-2 rounded-lg bg-slate-800/70 text-slate-100 transition-all ${errors.role ? 'border-red-500' : 'border-slate-700/50'}`}
              >
                <option value="">Select a role</option>
                {ROLES.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              {errors.role && <span className="text-xs text-red-400 mt-1">{errors.role}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Tech Stack</label>
              <input
                type="text"
                onKeyPress={handleAddTech}
                placeholder="Type and press Enter"
                className={`w-full px-4 py-3 border-2 rounded-lg bg-slate-800/70 text-slate-100 transition-all ${errors.techStack ? 'border-red-500' : 'border-slate-700/50'}`}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.techStack.map((tech, index) => (
                  <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs border border-purple-500/40 flex items-center gap-2">
                    {tech}
                    <button type="button" onClick={() => handleRemoveTech(tech)} className="text-purple-400 hover:text-purple-200">✕</button>
                  </span>
                ))}
              </div>
              {errors.techStack && <span className="text-xs text-red-400 mt-1">{errors.techStack}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">Experience (years)</label>
              <input
                type="number"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                min="0"
                max="50"
                className={`w-full px-4 py-3 border-2 rounded-lg bg-slate-800/70 text-slate-100 transition-all ${errors.experience ? 'border-red-500' : 'border-slate-700/50'}`}
              />
              {errors.experience && <span className="text-xs text-red-400 mt-1">{errors.experience}</span>}
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-2">About</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full px-4 py-3 border-2 border-slate-700/50 rounded-lg bg-slate-800/70 text-slate-100 transition-all"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-60 transition-all"
              >
                {submitting ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => navigate(`/profile/${id}`)}
                className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditDeveloperPage;
