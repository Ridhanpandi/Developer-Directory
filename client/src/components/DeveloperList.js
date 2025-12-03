import React from 'react';
import DeveloperCard from './DeveloperCard';

function DeveloperList({ developers, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-800/70 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-700/50">
        <div className="w-12 h-12 border-4 border-slate-700 border-t-purple-600 rounded-full mb-4 animate-spin"></div>
        <p className="text-slate-400">Loading developers...</p>
      </div>
    );
  }

  if (developers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-slate-800/70 backdrop-blur-xl rounded-2xl border-2 border-dashed border-slate-700/50">
        <span className="text-5xl mb-4">📭</span>
        <h3 className="text-xl text-slate-100 mb-2">No developers found</h3>
        <p className="text-slate-500">Add your first developer or adjust your filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {developers.map(developer => (
        <DeveloperCard key={developer.id} developer={developer} />
      ))}
    </div>
  );
}

export default DeveloperList;
