import React from 'react';

const roleColors = {
  'Frontend': { bg: 'from-yellow-500/20 to-yellow-600/20', text: 'text-yellow-300', border: 'border-yellow-500/40' },
  'Backend': { bg: 'from-blue-500/20 to-blue-600/20', text: 'text-blue-300', border: 'border-blue-500/40' },
  'Full-Stack': { bg: 'from-green-500/20 to-green-600/20', text: 'text-green-300', border: 'border-green-500/40' }
};

function DeveloperCard({ developer }) {
  const { name, role, techStack, experience } = developer;
  const colors = roleColors[role] || roleColors['Full-Stack'];

  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const gradients = {
    'Frontend': 'from-yellow-600 to-orange-600',
    'Backend': 'from-blue-600 to-cyan-600',
    'Full-Stack': 'from-green-600 to-emerald-600'
  };

  return (
    <article className="developer-card">
      <div className="card-header">
        <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0 bg-gradient-to-br ${gradients[role] || gradients['Full-Stack']}`}>
          {getInitials(name)}
        </div>
        <div className="card-info">
          <h3 className="dev-name">{name}</h3>
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide bg-gradient-to-br ${colors.bg} ${colors.text} ${colors.border} border`}>
            {role}
          </span>
        </div>
      </div>
      
      <div className="card-body">
        <div className="experience">
          <span className="exp-icon">⏱️</span>
          <span>{experience} {experience === 1 ? 'year' : 'years'} experience</span>
        </div>
        
        <div className="tech-stack">
          <span className="tech-label">Tech Stack:</span>
          <div className="tech-tags">
            {techStack.map((tech, index) => (
              <span key={index} className="tech-tag">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export default DeveloperCard;
