import React, { useState } from 'react';
import { addDeveloper } from '../services/api';
import { toast } from 'react-toastify';

const ROLES = ['Frontend', 'Backend', 'Full-Stack'];

const initialFormState = {
  name: '',
  role: '',
  techStack: [],
  experience: '',
  description: ''
};

function DeveloperForm({ onSubmit, isDark = true }) {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    if (!formData.role) {
      newErrors.role = 'Please select a role';
    }
    
    if (formData.techStack.length === 0) {
      newErrors.techStack = 'Add at least one technology';
    }
    
    if (formData.experience === '') {
      newErrors.experience = 'Experience is required';
    } else if (formData.experience < 0 || formData.experience > 50) {
      newErrors.experience = 'Experience must be 0-50 years';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleAddTech = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const tech = e.target.value.trim();
      if (tech && !formData.techStack.includes(tech)) {
        setFormData(prev => ({ ...prev, techStack: [...prev.techStack, tech] }));
        e.target.value = '';
        if (errors.techStack) {
          setErrors(prev => ({ ...prev, techStack: '' }));
        }
      } else if (!tech) {
        toast.error('Please enter a technology name');
      } else if (formData.techStack.includes(tech)) {
        toast.error('This technology is already added');
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
      await addDeveloper(formData);
      setFormData(initialFormState);
      await onSubmit();
      toast.success('Developer added successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to add developer');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className={`form-card ${isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white border-slate-200'}`}>
      <h2 className={`form-title ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
        <span className="form-icon">➕</span>
        Add Developer
      </h2>
      
      <form onSubmit={handleSubmit} className="developer-form">
        <div className="form-group">
          <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`w-full px-4 py-3 border-2 rounded-lg text-sm bg-slate-800/70 backdrop-blur-xl text-slate-100 transition-all ${errors.name ? 'border-red-500' : 'border-slate-700/50'}`}
          />
          {errors.name && <span className="text-xs text-red-400 font-medium mt-1">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="role" className="block text-sm font-medium text-slate-400 mb-1">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg text-sm bg-slate-800/70 backdrop-blur-xl text-slate-100 transition-all ${errors.role ? 'border-red-500' : 'border-slate-700/50'}`}
          >
            <option value="">Select a role</option>
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <span className="text-xs text-red-400 font-medium mt-1">{errors.role}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="techStack" className="block text-sm font-medium text-slate-400 mb-1">Tech Stack</label>
          <input
            type="text"
            id="techStack"
            onKeyPress={handleAddTech}
            placeholder="Type technology name and press Enter (e.g., React, Node.js)"
            className={`w-full px-4 py-3 border-2 rounded-lg text-sm bg-slate-800/70 backdrop-blur-xl text-slate-100 transition-all ${errors.techStack ? 'border-red-500' : 'border-slate-700/50'}`}
          />
          <p className="text-xs text-slate-500 mt-1">Press Enter to add each technology</p>
          <div className="flex flex-wrap gap-2 mt-3">
            {formData.techStack.length > 0 ? (
              formData.techStack.map((tech, index) => (
                <span key={index} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-xs border border-purple-500/40 flex items-center gap-2">
                  {tech}
                  <button type="button" onClick={() => handleRemoveTech(tech)} className="text-purple-400 hover:text-purple-200">✕</button>
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-500 italic">No technologies added yet</span>
            )}
          </div>
          {errors.techStack && <span className="text-xs text-red-400 font-medium mt-1">{errors.techStack}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="experience" className="block text-sm font-medium text-slate-400 mb-1">Experience (years)</label>
          <input
            type="number"
            id="experience"
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            placeholder="3"
            min="0"
            max="50"
            className={`w-full px-4 py-3 border-2 rounded-lg text-sm bg-slate-800/70 backdrop-blur-xl text-slate-100 transition-all ${errors.experience ? 'border-red-500' : 'border-slate-700/50'}`}
          />
          {errors.experience && <span className="text-xs text-red-400 font-medium mt-1">{errors.experience}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description" className="block text-sm font-medium text-slate-400 mb-1">About (Optional)</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tell us about yourself..."
            rows="3"
            className="w-full px-4 py-3 border-2 border-slate-700/50 rounded-lg text-sm bg-slate-800/70 backdrop-blur-xl text-slate-100 transition-all"
          />
        </div>

        <button 
          type="submit" 
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-500 to-cyan-500 text-white border-0 rounded-lg text-base font-semibold cursor-pointer transition-all duration-300 mt-2 relative overflow-hidden hover:shadow-lg hover:shadow-purple-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              Adding...
            </>
          ) : (
            'Add Developer'
          )}
        </button>
      </form>
    </div>
  );
}

export default DeveloperForm;
