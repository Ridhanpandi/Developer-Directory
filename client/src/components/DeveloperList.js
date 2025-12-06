import React from 'react';
import DeveloperCard from './DeveloperCard';

function DeveloperList({ developers, loading, onDelete, onViewProfile, isDark = true }) {
  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 px-6 text-center backdrop-blur-xl rounded-2xl border-2 border-dashed ${isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-slate-100 border-slate-300'}`}>
        <div className={`w-12 h-12 border-4 rounded-full mb-4 animate-spin ${isDark ? 'border-slate-700 border-t-purple-600' : 'border-slate-400 border-t-purple-600'}`}></div>
        <p className={isDark ? 'text-slate-400' : 'text-slate-600'}>Loading developers...</p>
      </div>
    );
  }

  if (developers.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-16 px-6 text-center backdrop-blur-xl rounded-2xl border-2 border-dashed ${isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-slate-100 border-slate-300'}`}>
        <span className="text-5xl mb-4">📭</span>
        <h3 className={`text-xl mb-2 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>No developers found</h3>
        <p className={isDark ? 'text-slate-500' : 'text-slate-600'}>Add your first developer or adjust your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {developers.map(developer => (
        <DeveloperCard key={developer.id} developer={developer} onDelete={onDelete} onViewProfile={onViewProfile} />
      ))}
    </div>
  );
}

export default DeveloperList;
