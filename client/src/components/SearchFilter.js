import React from 'react';

const ROLES = ['Frontend', 'Backend', 'Full-Stack'];

function SearchFilter({ filters, onFilterChange }) {
  return (
    <div className="flex gap-4 mb-6 flex-wrap">
      <div className="flex-1 min-w-72 relative flex items-center">
        <span className="absolute left-4 text-base pointer-events-none">🔍</span>
        <input
          type="text"
          placeholder="Search by name or tech stack..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          aria-label="Search developers"
          className="w-full px-11 py-3.5 border-2 border-slate-700/50 rounded-xl text-sm font-normal bg-slate-800/70 backdrop-blur-xl text-slate-100 transition-all duration-300 focus:outline-none focus:border-purple-500"
        />
        {filters.search && (
          <button 
            onClick={() => onFilterChange({ search: '' })}
            aria-label="Clear search"
            className="absolute right-3 bg-slate-700 border-0 w-6 h-6 rounded-full cursor-pointer text-xs text-slate-400 transition-all duration-300 hover:bg-red-500 hover:text-white"
          >
            ✕
          </button>
        )}
      </div>
      
      <div className="flex items-center gap-2.5">
        <label htmlFor="role-filter" className="text-sm font-medium text-slate-400 whitespace-nowrap">Filter by Role:</label>
        <select
          id="role-filter"
          value={filters.role}
          onChange={(e) => onFilterChange({ role: e.target.value })}
          className="px-4 py-3 border-2 border-slate-700/50 rounded-xl text-sm font-normal bg-slate-800/70 backdrop-blur-xl text-slate-100 cursor-pointer transition-all duration-300 focus:outline-none focus:border-purple-500"
        >
          <option value="">All Roles</option>
          {ROLES.map(role => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchFilter;
