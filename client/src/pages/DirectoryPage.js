import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getDevelopers, deleteDeveloper } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import DeveloperForm from '../components/DeveloperForm';
import DeveloperList from '../components/DeveloperList';
import SearchFilter from '../components/SearchFilter';

function DirectoryPage() {
  const [developers, setDevelopers] = useState([]);
  const [filteredDevelopers, setFilteredDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ search: '', role: '', sortBy: 'experience', sortOrder: 'asc' });
  const [pagination, setPagination] = useState({ page: 1, limit: 12, total: 0, pages: 0 });
  const { logout } = useContext(AuthContext);
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const fetchDevelopers = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getDevelopers({
        page,
        limit: pagination.limit,
        role: filters.role || undefined,
        search: filters.search || undefined,
        sortBy: filters.sortBy,
        sortOrder: filters.sortOrder
      });
      setDevelopers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to fetch developers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevelopers(1);
  }, [filters]);

  const handleAddDeveloper = async (developerData) => {
    try {
      await getDevelopers(); // Refresh list
      fetchDevelopers(1);
      toast.success('Developer added successfully!');
      return true;
    } catch (error) {
      toast.error('Failed to add developer');
      return false;
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleDeleteDeveloper = async (id) => {
    try {
      await deleteDeveloper(id);
      setDevelopers(prev => prev.filter(dev => dev.id !== id));
      toast.success('Developer deleted successfully!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete developer');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50'}`}>
      <header className={`${isDark ? 'bg-slate-800/70 border-slate-700/50' : 'bg-white border-slate-200'} backdrop-blur-xl border-b sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Developer Directory</h1>
          <div className="flex gap-3 items-center">
            <button
              onClick={toggleTheme}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${isDark ? 'bg-yellow-600 hover:bg-yellow-700 text-white' : 'bg-slate-800 hover:bg-slate-900 text-white'}`}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <DeveloperForm onSubmit={handleAddDeveloper} isDark={isDark} />
            </aside>
            
            <section className="lg:col-span-3">
              <SearchFilter filters={filters} onFilterChange={handleFilterChange} isDark={isDark} />
              <DeveloperList 
                developers={developers} 
                loading={loading} 
                onDelete={handleDeleteDeveloper}
                onViewProfile={(id) => navigate(`/profile/${id}`)}
                isDark={isDark}
              />
              
              {pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => fetchDevelopers(page)}
                      className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                        pagination.page === page
                          ? 'bg-purple-600 text-white'
                          : isDark ? 'bg-slate-700 text-slate-300 hover:bg-slate-600' : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DirectoryPage;
