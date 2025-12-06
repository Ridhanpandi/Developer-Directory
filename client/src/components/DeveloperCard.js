import React from 'react';

const roleColors = {
  'Frontend': { bg: 'from-yellow-500/20 to-yellow-600/20', text: 'text-yellow-300', border: 'border-yellow-500/40' },
  'Backend': { bg: 'from-blue-500/20 to-blue-600/20', text: 'text-blue-300', border: 'border-blue-500/40' },
  'Full-Stack': { bg: 'from-green-500/20 to-green-600/20', text: 'text-green-300', border: 'border-green-500/40' }
};

function DeveloperCard({ developer, onDelete, onViewProfile, isDark = true }) {
  const { id, name, role, tech_stack, experience } = developer;
  const colors = roleColors[role] || roleColors['Full-Stack'];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const gradients = {
    'Frontend': 'from-yellow-600 to-orange-600',
    'Backend': 'from-blue-600 to-cyan-600',
    'Full-Stack': 'from-green-600 to-emerald-600'
  };

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      onDelete(id);
    }
  };

  return (
    <article className={`developer-card ${isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 bg-gradient-to-br ${gradients[role] || gradients['Full-Stack']}`}>
          {getInitials(name)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={`text-lg font-semibold mb-1.5 whitespace-nowrap overflow-hidden text-ellipsis ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{name}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide bg-gradient-to-br ${colors.bg} ${colors.text} ${colors.border} border`}>
            {role}
          </span>
        </div>
      </div>
      
      <div className="card-body">
        <div className={`experience ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
          <span className="exp-icon">⏱️</span>
          <span>{experience} {experience === 1 ? 'year' : 'years'} experience</span>
        </div>
        
        <div className="tech-stack">
          <span className={`tech-label ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Tech Stack:</span>
          <div className="tech-tags">
            {tech_stack.map((tech, index) => (
              <span key={index} className={`tech-tag ${isDark ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-800'}`}>{tech}</span>
            ))}
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => onViewProfile(id)}
            className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg font-semibold transition-colors"
          >
            View Profile
          </button>
          <button
            onClick={handleDelete}
            className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-lg font-semibold transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
}

export default DeveloperCard;
