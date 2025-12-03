import React, { useState } from 'react';

const ROLES = ['Frontend', 'Backend', 'Full-Stack'];

const initialFormState = {
  name: '',
  role: '',
  techStack: '',
  experience: ''
};

function DeveloperForm({ onSubmit }) {
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
    
    if (!formData.techStack.trim()) {
      newErrors.techStack = 'Tech stack is required';
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setSubmitting(true);
    const success = await onSubmit(formData);
    setSubmitting(false);
    
    if (success) {
      setFormData(initialFormState);
    }
  };

  return (
    <div className="form-card">
      <h2 className="form-title">
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
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && <span id="name-error" className="text-xs text-red-400 font-medium mt-1">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="role" className="block text-sm font-medium text-slate-400 mb-1">Role</label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className={`w-full px-4 py-3 border-2 rounded-lg text-sm bg-slate-800/70 backdrop-blur-xl text-slate-100 transition-all ${errors.role ? 'border-red-500' : 'border-slate-700/50'}`}
            aria-describedby={errors.role ? 'role-error' : undefined}
          >
            <option value="">Select a role</option>
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
          {errors.role && <span id="role-error" className="text-xs text-red-400 font-medium mt-1">{errors.role}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="techStack" className="block text-sm font-medium text-slate-400 mb-1">Tech Stack</label>
          <input
            type="text"
            id="techStack"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, MongoDB"
            className={`w-full px-4 py-3 border-2 rounded-lg text-sm bg-slate-800/70 backdrop-blur-xl text-slate-100 transition-all ${errors.techStack ? 'border-red-500' : 'border-slate-700/50'}`}
            aria-describedby={errors.techStack ? 'tech-error' : undefined}
          />
          <span className="text-xs text-slate-500 mt-1">Separate technologies with commas</span>
          {errors.techStack && <span id="tech-error" className="text-xs text-red-400 font-medium mt-1">{errors.techStack}</span>}
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
            aria-describedby={errors.experience ? 'exp-error' : undefined}
          />
          {errors.experience && <span id="exp-error" className="text-xs text-red-400 font-medium mt-1">{errors.experience}</span>}
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
