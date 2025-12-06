import React from 'react';

const ROLES = ['Frontend', 'Backend', 'Full-Stack'];

function SearchFilter({ filters, onFilterChange, isDark = true }) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex gap-4 flex-wrap">
        <div className="flex-1 min-w-72 relative flex items-center">
          <span className="absolute left-4 text-base pointer-events-none">🔍</span>
          <input
            type="text"
            placeholder="Search by name or tech stack..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            aria-label="Search developers"
            className={`w-full px-11 py-3.5 border-2 rounded-xl text-sm font-normal backdrop-blur-xl transition-all duration-300 focus:outline-none focus:border-purple-500 ${isDark ? 'border-slate-700/50 bg-slate-800/70 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`}
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
          <label htmlFor="role-filter" className={`text-sm font-medium whitespace-nowrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Role:</label>
          <select
            id="role-filter"
            value={filters.role}
            onChange={(e) => onFilterChange({ role: e.target.value })}
            className={`px-4 py-3 border-2 rounded-xl text-sm font-normal backdrop-blur-xl cursor-pointer transition-all duration-300 focus:outline-none focus:border-purple-500 ${isDark ? 'border-slate-700/50 bg-slate-800/70 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`}
          >
            <option value="">All Roles</option>
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <label htmlFor="sort-by" className={`text-sm font-medium whitespace-nowrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Sort by:</label>
          <select
            id="sort-by"
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ sortBy: e.target.value })}
            className={`px-4 py-3 border-2 rounded-xl text-sm font-normal backdrop-blur-xl cursor-pointer transition-all duration-300 focus:outline-none focus:border-purple-500 ${isDark ? 'border-slate-700/50 bg-slate-800/70 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`}
          >
            <option value="experience">Experience</option>
            <option value="name">Name</option>
            <option value="joining_date">Joining Date</option>
          </select>
        </div>

        <div className="flex items-center gap-2.5">
          <label htmlFor="sort-order" className={`text-sm font-medium whitespace-nowrap ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Order:</label>
          <select
            id="sort-order"
            value={filters.sortOrder}
            onChange={(e) => onFilterChange({ sortOrder: e.target.value })}
            className={`px-4 py-3 border-2 rounded-xl text-sm font-normal backdrop-blur-xl cursor-pointer transition-all duration-300 focus:outline-none focus:border-purple-500 ${isDark ? 'border-slate-700/50 bg-slate-800/70 text-slate-100' : 'border-slate-300 bg-white text-slate-900'}`}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default SearchFilter;
